import { useNavigationStore } from "@features/toggle-modal-navigation";
import { cn } from "@shared/lib/styles";

import { NAV_ITEMS } from "../../config/nav-items";
import { ExpandableNavItem } from "../expandable-nav-item/expandable-nav-item";
import { NavLinkItem } from "../nav-link-item/nav-link-item";

import s from "./navigation-modal.module.scss";

export const NavigationModal = () => {
  const { isNavigationOpen, toggleIsNavigationOpen } = useNavigationStore();

  return (
    <div
      className={cn(isNavigationOpen && s.modalBackground)}
      onClick={toggleIsNavigationOpen}
    >
      <div
        className={cn(s.modal, isNavigationOpen ? s.open : s.close)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={s.line}></div>
        <ul className={s.list}>
          {NAV_ITEMS.map((item, index) => {
            if (item.dropDownList) {
              return (
                <ExpandableNavItem
                  dropDownList={item}
                  key={index}
                />
              );
            } else {
              return (
                <NavLinkItem
                  key={index}
                  text={item.text}
                  to={item.to}
                />
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};
