import { useState } from "react";

import { ChevronDown } from "@shared/ui/icons";
import { cn } from "@shared/lib/styles";

import s from "./dropdown-select.module.scss";

export type DropdownOption = {
  value: string;
  label: string;
};

type DropdownItem = string | DropdownOption;

type OnSelectedItemChangeArgs = {
  newSelectedItem: DropdownOption;
};

type DropdownSelectProps = {
  dropdownItems: DropdownItem[];
  selectedValue: string | null;
  onSelect: ({ newSelectedItem }: OnSelectedItemChangeArgs) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export const DropdownSelect = ({
  dropdownItems,
  selectedValue,
  onSelect,
  placeholder = "Choose value",
  className,
  disabled = false,
}: DropdownSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const normalizedOptions: DropdownOption[] = dropdownItems.map((item) =>
    typeof item === "string" ? { value: item, label: item } : item
  );

  const selectedOption = normalizedOptions.find(
    (option) => option.value === selectedValue
  );

  return (
    <div
      onClick={(e) => {
        if (disabled) return;
        setIsOpen(!isOpen);
        e.stopPropagation();
      }}
      className={cn(s.dictionarySelect, className, disabled && s.disabled)}
    >
      <button
        className={s.selectedVariant}
        type="button"
        disabled={disabled}
      >
        <span>{selectedOption?.label || placeholder}</span>
        <ChevronDown className={cn(s.chevron, isOpen && s.rotate)} />
      </button>

      <div className={cn(s.selectVariants, isOpen ? s.open : "")}>
        {normalizedOptions.map((item, index) => (
          <button
            className={s.dictionariesVariant}
            onClick={() => {
              onSelect({
                newSelectedItem: item,
              });
              setIsOpen(!isOpen);
            }}
            key={index}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
