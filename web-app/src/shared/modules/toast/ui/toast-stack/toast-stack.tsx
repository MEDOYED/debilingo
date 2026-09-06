import s from "./toast-stack.module.scss";

import { useToastStore } from "../../model/use-toast-store";
import { Toast } from "../toast/toast";

export const ToastStack = () => {
  const { errorMessages, successMessages } = useToastStore();

  return (
    <div className={s.toastStack}>
      {successMessages?.map((successMessage, index) => (
        <Toast
          variant="success"
          message={successMessage}
          key={index}
        />
      ))}

      {errorMessages?.map((errorMessage, index) => (
        <Toast
          variant="error"
          message={errorMessage}
          key={index}
        />
      ))}
    </div>
  );
};
