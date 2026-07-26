import { Link, useLocation } from "react-router-dom";

import {
  ToggleNavigationModalButton,
  useNavigationStore,
} from "@features/toggle-modal-navigation";
import { cn } from "@shared/lib/styles";

import { NAV_ITEMS } from "../config/navigation-list-data";

import s from "./mobile-bottom-bar.module.scss";

export const MobileBottomBar = () => {
  const location = useLocation();
  // console.log(location.pathname);

  const { isNavigationOpen } = useNavigationStore();

  return (
    <nav
      className={s.navigation}
      aria-label="Головна навігація"
    >
      <ul className={s.list}>
        <li
          className={cn(s.listItem, {
            [s.active]: isNavigationOpen === true,
          })}
        >
          <ToggleNavigationModalButton />
        </li>

        {NAV_ITEMS.map((item, index) => {
          return (
            <li
              className={cn(s.listItem, {
                [s.active]: location.pathname === item.to,
              })}
              key={index}
            >
              <Link
                className={s.link}
                to={item.to}
                aria-label={item.label}
              >
                <item.Icon className={s.icon} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
