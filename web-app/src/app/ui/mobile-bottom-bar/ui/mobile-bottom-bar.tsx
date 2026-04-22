import { Link, useLocation } from "react-router-dom";

import { cn } from "@shared/lib/styles";
import { navigationListData } from "../config/navigation-list-data";

import s from "./mobile-bottom-bar.module.scss";

export const MobileBottomBar = () => {
  const location = useLocation();
  // console.log(location.pathname);

  return (
    <nav
      className={s.navigation}
      aria-label="Головна навігація"
    >
      <ul className={s.list}>
        {/* burger icon in future that will be open navigation-modal */}
        <li className={cn(s.listItem, s.bugerIcon)}>B</li>
        {navigationListData.map((item, index) => {
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
