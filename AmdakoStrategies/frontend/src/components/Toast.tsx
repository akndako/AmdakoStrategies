import { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { theme } from "../theme";

export type ToastVariant = "success" | "error" | "info";

export type ToastPayload = {
  message: string;
  variant?: ToastVariant;
};

type ToastProps = {
  toast: ToastPayload | null;
  onDismiss: () => void;
  duration?: number;
};

const variantStyles: Record<
  ToastVariant,
  { border: string; accent: string; icon: typeof CheckCircle }
> = {
  success: { border: theme.colors.success, accent: theme.colors.success, icon: CheckCircle },
  error: { border: theme.colors.danger, accent: theme.colors.danger, icon: AlertCircle },
  info: { border: theme.colors.primary, accent: theme.colors.primary, icon: Info },
};

const ToastContainer = styled(motion.div)<{ $accent: string }>`
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: min(520px, calc(100vw - 32px));
  background: #fff;
  border: 1px solid ${({ $accent }) => $accent};
  border-left: 4px solid ${({ $accent }) => $accent};
  border-radius: ${theme.radii.medium};
  padding: 14px 12px 14px 20px;
  box-shadow: 0 4px 20px rgba(26, 26, 24, 0.15);
  color: ${theme.colors.text};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.45;

  @media (max-width: 480px) {
    top: 16px;
    font-size: 13px;
  }
`;

const IconWrap = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
  flex-shrink: 0;
  display: flex;
`;

const Message = styled.span`
  flex: 1;
`;

const DismissButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${theme.radii.small};
  background: transparent;
  color: ${theme.colors.textMuted};
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${theme.colors.surfaceAlt};
    color: ${theme.colors.text};
  }
`;

export default function Toast({ toast, onDismiss, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [toast, duration, onDismiss]);

  const variant = toast?.variant ?? "success";
  const styles = variantStyles[variant];
  const Icon = styles.icon;

  return (
    <AnimatePresence>
      {toast && (
        <ToastContainer
          $accent={styles.border}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          role="status"
          aria-live="polite"
        >
          <IconWrap $color={styles.accent}>
            <Icon size={18} aria-hidden />
          </IconWrap>
          <Message>{toast.message}</Message>
          <DismissButton type="button" onClick={onDismiss} aria-label="Dismiss notification">
            <X size={16} />
          </DismissButton>
        </ToastContainer>
      )}
    </AnimatePresence>
  );
}
