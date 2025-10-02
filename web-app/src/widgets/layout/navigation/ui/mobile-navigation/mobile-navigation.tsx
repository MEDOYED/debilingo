import { Link, useLocation } from "react-router-dom";

import { cn } from "@/shared/lib/utils/classnames/classnames";
import { navigationListData } from "../../model/constants/navigation-list-data";

import s from "./mobile-navigation.module.scss";

export const MobileNavigation = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <nav
      className={s.navigation}
      aria-label="Головна навігація"
    >
      <ul className={s.list}>
        {navigationListData.map((item, index) => {
          const Icon = item.icon;

          return (
            <li
              className={cn(s.listItem, {
                [s.active]: location.pathname === item.to,
              })}
              key={index}
            >
              <Link
                to={item.to}
                aria-label={item.label}
              >
                <Icon color="var(--color-300)" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
