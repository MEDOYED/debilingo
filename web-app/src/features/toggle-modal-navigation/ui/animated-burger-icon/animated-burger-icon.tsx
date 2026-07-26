import { cn } from "@shared/lib/styles";

import s from "./animated-burger-icon.module.scss";

type AnimatedBurgerIconProps = {
  isOpen: boolean;
};

export const AnimatedBurgerIcon = ({
  isOpen,
}: AnimatedBurgerIconProps) => {
  return (
    <svg
      className={cn(s.headerBurger, isOpen === true && s.open)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line
        className={s.top}
        x1="4"
        x2="20"
        y1="6"
        y2="6"
      />
      <line
        className={s.middle}
        x1="4"
        x2="20"
        y1="12"
        y2="12"
      />
      <line
        className={s.bottom}
        x1="4"
        x2="20"
        y1="18"
        y2="18"
      />
    </svg>
  );
};
