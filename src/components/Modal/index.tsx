import React from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  backdropClassName?: string;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, children, className, backdropClassName }, ref) => {
    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    if (!open) return null;

    const modalContent = (
      <div
        className={classNames("modal modal-open", backdropClassName)}
        onClick={handleBackdropClick}
        ref={ref}
      >
        <div className={classNames("modal-box", className)}>{children}</div>
      </div>
    );

    return createPortal(modalContent, document.body);
  }
);

Modal.displayName = "Modal";

export default Modal;
