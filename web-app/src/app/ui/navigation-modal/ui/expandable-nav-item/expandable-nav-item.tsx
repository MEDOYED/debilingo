import { useState } from "react";

import { ChevronDown } from "@shared/ui/icons";
import { TextButton } from "@shared/ui/buttons";
import { useWindowSize } from "@shared/lib/responsive";
import { cn } from "@shared/lib/styles";

import { NavLinkItem } from "../nav-link-item/nav-link-item";

import s from "./expandable-nav-item.module.scss";

type ExpandableNavItemData = {
  text: string;
  dropDownList: {
    to: string;
    text: string;
  }[];
};

type ExpandableNavItemProps = {
  dropDownList: ExpandableNavItemData;
};

export const ExpandableNavItem = ({
  dropDownList,
}: ExpandableNavItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { windowWidth } = useWindowSize();

  return (
    <div>
      <TextButton
        as="button"
        onClick={() => setIsOpen(prev => !prev)}
        size={windowWidth > 768 ? "large" : "medium"}
        className={cn(
          isOpen === true && s.activeTextButtonWithHoverEffect,
        )}
      >
        {dropDownList.text}
        <ChevronDown
          className={cn(isOpen === true && s.rotateChevronUp)}
        />
      </TextButton>

      {isOpen && (
        <ul className={s.dropDownListItems}>
          {dropDownList.dropDownList.map((item, index) => (
            <NavLinkItem
              text={item.text}
              to={item.to}
              key={index}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
