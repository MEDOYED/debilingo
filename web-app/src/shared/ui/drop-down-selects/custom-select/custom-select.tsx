import { useState, type Dispatch, type SetStateAction } from "react";

import type { Dictionary } from "@shared/api/dictionaryApi";
import { ChevronDown } from "@shared/ui/icons";
import { cn } from "@shared/lib/styles";

import s from "./custom-select.module.scss";

type CustomSelectProps = {
  dictionaries?: Dictionary[];
  languages?: string[];
  setDictionaryId?: Dispatch<SetStateAction<string>>;
  setMainLanguage?: (mainLanguageValue: string) => void;
  setSecondaryLanguage?: (secondaryLanguageValue: string) => void;
  className?: string;
  dropdownClassName?: string;
};

export const CustomSelect = ({
  dictionaries,
  setDictionaryId,
  languages,
  setMainLanguage,
  setSecondaryLanguage,
  className,
  dropdownClassName,
}: CustomSelectProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("Chose language");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={cn(s.dictionarySelect, className)}
    >
      <div className={s.selectedVariant}>
        <button>{selectedLanguage}</button>
        <ChevronDown />
      </div>

      <div
        className={cn(
          s.selectVariants,
          dropdownClassName,
          isOpen ? s.open : ""
        )}
      >
        {dictionaries &&
          dictionaries.map((dictionary) => (
            <button
              key={dictionary.id}
              onClick={() => {
                setDictionaryId?.(dictionary.id);
                setSelectedLanguage(dictionary.main_language);
                setIsOpen(false);
              }}
              className={s.dictionariesVariant}
            >
              {dictionary.main_language}
            </button>
          ))}

        {languages &&
          languages.map((language) => (
            <button
              key={language}
              onClick={() => {
                setMainLanguage?.(language);
                setSecondaryLanguage?.(language);
                setSelectedLanguage(language);
                setIsOpen(false);
              }}
              className={s.dictionariesVariant}
            >
              {language}
            </button>
          ))}
      </div>
    </div>
  );
};
