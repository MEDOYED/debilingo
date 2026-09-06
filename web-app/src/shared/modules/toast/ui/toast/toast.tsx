import { TextButton } from "@shared/ui/buttons";
import { cn } from "@shared/lib/styles";

import { useToastStore } from "../../model/use-toast-store";

import s from "./toast.module.scss";

type ToastProps = {
  variant: "success" | "error";
  message: string;
};

export const Toast = ({ variant, message }: ToastProps) => {
  const { deleteSuccessMessage, deleteErrorMessage } =
    useToastStore();

  const handleCloseToast = () => {
    if (variant === "success") {
      deleteSuccessMessage(message);
    } else if (variant === "error") {
      deleteErrorMessage(message);
    }
  };

  const variantClass: Record<ToastProps["variant"], string> = {
    success: s.success,
    error: s.error,
  };

  return (
    <div className={cn(s.toastModal, variantClass[variant])}>
      <TextButton
        as="button"
        onClick={handleCloseToast}
        className={s.closeBtn}
      >
        ✕
      </TextButton>

      <div>{message}</div>
    </div>
  );
};
