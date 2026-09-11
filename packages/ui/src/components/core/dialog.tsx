"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, children, className = "" }: DialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full max-w-lg rounded-2xl border border-neutral-200 bg-white shadow-xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`border-b border-neutral-100 px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

export function DialogContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 ${className}`}>{children}</div>
  );
}

export function DialogFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-end gap-2 border-t border-neutral-100 px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}
