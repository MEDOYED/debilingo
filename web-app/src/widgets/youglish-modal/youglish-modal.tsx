import { useEffect } from "react";

import s from "./youglish-modal.module.scss";
import { TextButton } from "@shared/ui/buttons";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const YouGlishModal = ({ children, onClose }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={s.overlay}
      onClick={handleOverlayClick}
    >
      <div className={s.modal}>
        <TextButton
          as="button"
          className={s.close}
          onClick={onClose}
        >
          X
        </TextButton>

        {children}
      </div>
    </div>
  );
};
