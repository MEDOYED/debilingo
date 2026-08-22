import { useState, type Dispatch, type SetStateAction } from "react";

import type { Dictionary } from "@shared/api/dictionaryApi";
import { ChevronDown } from "@shared/ui/icons";

import s from "./custom-select.module.scss";

type CustomSelectProps = {
  dictionaries: Dictionary[];
  setDictionaryId: Dispatch<SetStateAction<string>>;
};

export const CustomSelect = ({
  dictionaries,
  setDictionaryId,
}: CustomSelectProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("Chose language");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={s.dictionarySelect}
    >
      <div className={s.selectedVariant}>
        <button>{selectedLanguage}</button>
        <ChevronDown />
      </div>

      {/* import { cn } from "@shared/lib/styles";  */}
      <div className={`${s.selectVariants} ${isOpen ? s.open : ""}`}>
        {dictionaries.map((dictionary) => (
          <button
            onClick={() => {
              setDictionaryId(dictionary.id);
              setSelectedLanguage(dictionary.main_language);
              setIsOpen(!isOpen);
            }}
            className={s.dictionariesVariant}
          >
            {dictionary.main_language}
          </button>
        ))}
      </div>
    </div>
  );
};
