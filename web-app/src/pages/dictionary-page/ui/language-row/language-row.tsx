import { TextButton } from "@shared/ui/buttons";
import { EyeIcon } from "@shared/ui/icons";

import { useLanguageRowStore } from "../../model/use-language-row-store";

import s from "./language-row.module.scss";

export const LanguageRow = () => {
  const { hideMainLanguageCol } = useLanguageRowStore();

  return (
    <div className={s.languageRow}>
      <div>
        <span className={s.mainLanguage}>Слово</span>
        <TextButton
          as="button"
          onClick={hideMainLanguageCol}
        >
          <EyeIcon />
        </TextButton>
      </div>

      {/* change direction */}
      <div>{"->"}</div>

      <div>
        <span className={s.mainLanguage}>Переклад</span>
      </div>
    </div>
  );
};
