import { TextButton } from "@shared/ui/buttons";
import { ArrowsRightLeft, EyeIcon, EyeSlash } from "@shared/ui/icons";

import { useLanguageRowStore } from "../../model/use-language-row-store";

import s from "./language-row.module.scss";
import { cn } from "@shared/lib/styles";
import { useSwitchColStore } from "@pages/dictionary-page/model/use-switch-col-store";

export const LanguageRow = () => {
  const { hideMainLanguageCol, openMainLanguageCol, isMainLanguageColVisible } =
    useLanguageRowStore();

  const { hideTranslationCol, openTranslationCol, isTranslationColVisible } =
    useLanguageRowStore();

  const { isReversed, toggleReverse } = useSwitchColStore();

  return (
    <div className={cn(s.languageRow, isReversed && s.reverseRow)}>
      <div className={s.colWrapper}>
        <span>Слово</span>

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
      <ArrowsRightLeft
        className={s.switchCol}
        onClick={toggleReverse}
      />

      <div className={s.translateCol}>
        <div className={s.colWrapper}>
          <span>Переклад</span>
          {isTranslationColVisible ? (
            <TextButton
              as="button"
              onClick={hideTranslationCol}
            >
              <EyeIcon />
            </TextButton>
          ) : (
            <TextButton
              as="button"
              onClick={openTranslationCol}
            >
              <EyeSlash />
            </TextButton>
          )}
        </div>
      </div>
    </div>
  );
};
