import { CheckCircle, LoadingCircle } from "@shared/ui/icons";

import { useSubmitEditWord } from "../../model/use-submit-edit-word";

import s from "./submit-edit-word-button.module.scss";

export const SubmitEditWordButton = () => {
  const { handleSubmit, sendingStatus } = useSubmitEditWord();

  return (
    <button
      className={s.submitButton}
      onClick={handleSubmit}
    >
      {sendingStatus === "in-process" ? <LoadingCircle /> : <CheckCircle />}
    </button>
  );
};
