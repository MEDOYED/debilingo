import { TextButton } from "@shared/ui/buttons";
import { ArrowsRightLeft, EyeIcon, EyeSlash } from "@shared/ui/icons";

import { useLanguageRowStore } from "../../model/use-language-row-store";

import s from "./language-row.module.scss";

export const LanguageRow = () => {
  const { hideMainLanguageCol, openMainLanguageCol, isMainLanguageColVisible } =
    useLanguageRowStore();

  return (
    <div className={s.languageRow}>
      <div className={s.colWrapper}>
        <span className={s.mainLanguage}>Слово</span>

        {isMainLanguageColVisible ? (
          <TextButton
            as="button"
            onClick={hideMainLanguageCol}
          >
            <EyeIcon />
          </TextButton>
        ) : (
          <TextButton
            as="button"
            onClick={openMainLanguageCol}
          >
            <EyeSlash />
          </TextButton>
        )}
      </div>

      {/* change direction */}
      <div className={s.colWrapper}>
        <ArrowsRightLeft />
      </div>

      <div className={s.colWrapper}>
        <span className={s.mainLanguage}>Переклад</span>
      </div>
    </div>
  );
};
