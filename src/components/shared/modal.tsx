import React, { useEffect } from "react";

type ModalSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;

  size?: ModalSize;
  width?: string;
  height?: string;
  fullScreen?: boolean;
}

const sizeMap: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = "lg",
  width,
  height,
  fullScreen = false,
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Dropdowns and date pickers render in portals outside the modal element.
    // Their clicks still bubble through React, but are not backdrop clicks.
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]"
    >
      <div
        style={{
          width: width || undefined,
          maxHeight: height || undefined,
        }}
        className={`
          w-full bg-white rounded-2xl shadow-xl border border-slate-100
          flex flex-col overflow-hidden
          ${sizeMap[size]}
          ${fullScreen ? "h-screen rounded-none" : "max-h-[90vh]"}
        `}
      >
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
