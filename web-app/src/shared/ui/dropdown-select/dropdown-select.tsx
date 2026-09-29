import { useState, useEffect, useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: DropdownOption[] = dropdownItems.map((item) =>
    typeof item === "string" ? { value: item, label: item } : item
  );

  const selectedOption = normalizedOptions.find(
    (option) => option.value === selectedValue
  );

  // close dropdown on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      onClick={(e) => {
        if (disabled) return;
        setIsOpen(!isOpen);
        e.stopPropagation();
      }}
      className={cn(
        s.dropdownSelect,
        className,
        disabled && s.disabled,
        isOpen && s.open
      )}
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
            className={cn(s.selectVariant, selectedOption === item && s.active)}
            onClick={() => {
              onSelect({
                newSelectedItem: item,
              });
              setIsOpen(false);
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

// this component created 27.09.2026
// time spends on this component: 8 hours

//  to do:
// 1. generic types from to-do.md
// 2. placeholder to label when exist some selected item
// 3. stories for storybook
//
