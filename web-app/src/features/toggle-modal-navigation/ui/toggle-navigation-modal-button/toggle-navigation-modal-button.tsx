import { AnimatedBurgerIcon } from "../animated-burger-icon/animated-burger-icon";

import { useNavigationStore } from "../../model/navigation-store";

import s from "./toggle-navigation-modal-button.module.scss";

export const ToggleNavigationModalButton = () => {
  const { isNavigationOpen, toggleIsNavigationOpen } = useNavigationStore();

  return (
    <button
      className={s.toggleButton}
      onClick={toggleIsNavigationOpen}
    >
      <AnimatedBurgerIcon isOpen={isNavigationOpen} />
    </button>
  );
};
