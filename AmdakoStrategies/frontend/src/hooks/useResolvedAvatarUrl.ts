import { useEffect, useState } from "react";
import { resolveAvatarDisplayUrl } from "../services/profileService";

export function useResolvedAvatarUrl(stored: string | null | undefined): string | null {
  const [displayUrl, setDisplayUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!stored) {
      setDisplayUrl(null);
      return;
    }

    let cancelled = false;
    void resolveAvatarDisplayUrl(stored).then((url) => {
      if (!cancelled) setDisplayUrl(url);
    });

    return () => {
      cancelled = true;
    };
  }, [stored]);

  return displayUrl;
}
