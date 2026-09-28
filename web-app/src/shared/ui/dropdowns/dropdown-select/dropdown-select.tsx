import { useState } from "react";

import { ChevronDown } from "@shared/ui/icons";
import { cn } from "@shared/lib/styles";

import s from "./dropdown-select.module.scss";

type OnSelectedItemChangeArgs = {
  newSelectedItem: string;
};

type CustomSelectProps = {
  dropdownItems: string[];
  placeholder?: string;
  selectedItem: string | null;
  onSelectedItemChange: ({ newSelectedItem }: OnSelectedItemChangeArgs) => void;
};

export const DropdownSelect = ({
  dropdownItems,
  placeholder,
  selectedItem,
  onSelectedItemChange,
}: CustomSelectProps) => {
  const [selectedDropdownItem, setSelectedDropdownItem] = useState(
    selectedItem || placeholder
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={s.dictionarySelect}
    >
      <div className={s.selectedVariant}>
        <button>{selectedDropdownItem}</button>
        <ChevronDown />
      </div>

      <div className={cn(s.selectVariants, isOpen ? s.open : "")}>
        {dropdownItems.map((item) => (
          <button
            className={s.dictionariesVariant}
            onClick={() => {
              setSelectedDropdownItem(item);
              onSelectedItemChange({ newSelectedItem: item });
              setIsOpen(!isOpen);
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
