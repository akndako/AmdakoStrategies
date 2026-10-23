import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components";
import { Eraser } from "lucide-react";
import { theme } from "../theme";

export type SignaturePadHandle = {
  exportPngBlob: () => Promise<Blob>;
  exportDataUrl: () => string | null;
  hasSignature: () => boolean;
  clear: () => void;
};

type SignaturePadProps = {
  onSignatureChange?: (hasSignature: boolean) => void;
  disabled?: boolean;
  existingImageUrl?: string | null;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CanvasFrame = styled.div`
  position: relative;
  border: 2px dashed ${theme.colors.border};
  border-radius: ${theme.radii.large};
  background: #fff;
  touch-action: none;

  &:focus-within {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 4px ${theme.colors.primaryLight};
  }
`;

const Canvas = styled.canvas`
  display: block;
  width: 100%;
  height: 180px;
  border-radius: ${theme.radii.large};
  cursor: crosshair;

  @media (max-width: 480px) {
    height: 160px;
  }
`;

const ExistingImage = styled.img`
  display: block;
  width: 100%;
  max-height: 180px;
  object-fit: contain;
  padding: 12px;
  border-radius: ${theme.radii.large};
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const Hint = styled.p`
  font-size: 13px;
  color: ${theme.colors.textMuted};
  margin: 0;
  line-height: 1.5;
`;

const ClearButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: ${theme.radii.medium};
  border: 1px solid ${theme.colors.border};
  background: #fff;
  color: ${theme.colors.textSecondary};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    background: ${theme.colors.primaryLight};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function getPoint(canvas: HTMLCanvasElement, event: PointerEvent) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

const SignaturePad = forwardRef<SignaturePadHandle, SignaturePadProps>(function SignaturePad(
  { onSignatureChange, disabled = false, existingImageUrl = null },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const hasInkRef = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  const notifyInk = useCallback(
    (value: boolean) => {
      hasInkRef.current = value;
      setHasInk(value);
      onSignatureChange?.(value);
    },
    [onSignatureChange],
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || existingImageUrl) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    const hadInk = hasInkRef.current;
    const snapshot = hadInk ? canvas.toDataURL("image/png") : null;

    canvas.width = Math.floor(rect.width * ratio);
    canvas.height = Math.floor(rect.height * ratio);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = "#1A1A18";

    if (snapshot) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = snapshot;
    }
  }, [existingImageUrl]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    notifyInk(false);
  }, [notifyInk]);

  const exportPngBlob = useCallback((): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = canvasRef.current;
      if (!canvas || !hasInkRef.current) {
        reject(new Error("No signature drawn"));
        return;
      }
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Unable to export signature"));
        },
        "image/png",
        1,
      );
    });
  }, []);

  const exportDataUrl = useCallback((): string | null => {
    const canvas = canvasRef.current;
    if (!canvas || !hasInkRef.current) return null;
    return canvas.toDataURL("image/png");
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      exportPngBlob,
      exportDataUrl,
      hasSignature: () => hasInkRef.current,
      clear,
    }),
    [clear, exportDataUrl, exportPngBlob],
  );

  const startDraw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled || existingImageUrl) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    canvas.setPointerCapture(event.pointerId);
    drawingRef.current = true;
    const { x, y } = getPoint(canvas, event.nativeEvent);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || disabled || existingImageUrl) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { x, y } = getPoint(canvas, event.nativeEvent);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!hasInkRef.current) notifyInk(true);
  };

  const endDraw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas?.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
  };

  if (existingImageUrl) {
    return (
      <Wrapper>
        <Hint>Your saved signature is shown below.</Hint>
        <CanvasFrame>
          <ExistingImage src={existingImageUrl} alt="Your signature" />
        </CanvasFrame>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <CanvasFrame>
        <Canvas
          ref={canvasRef}
          aria-label="Draw your signature"
          onPointerDown={startDraw}
          onPointerMove={draw}
          onPointerUp={endDraw}
          onPointerLeave={endDraw}
          onPointerCancel={endDraw}
        />
      </CanvasFrame>
      <Toolbar>
        <Hint>Use your finger or mouse to sign in the box above.</Hint>
        <ClearButton type="button" onClick={clear} disabled={disabled || !hasInk}>
          <Eraser size={14} aria-hidden />
          Clear
        </ClearButton>
      </Toolbar>
    </Wrapper>
  );
});

export default SignaturePad;
