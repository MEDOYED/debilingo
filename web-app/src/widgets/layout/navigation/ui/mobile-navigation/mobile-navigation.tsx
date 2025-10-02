import { Link, useLocation } from "react-router-dom";

import { cn } from "@/shared/lib/utils/classnames/classnames";
import { DictionaryAdd, Gamepad, Home, Trophy } from "@/shared/ui/icons";

import s from "./mobile-navigation.module.scss";

const MobileNavigation = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <nav
      className={s.navigation}
      aria-label="Головна навігація"
    >
      <ul className={s.list}>
        <li
          className={cn(s.listItem, {
            [s.active]: location.pathname === "/dictionary",
          })}
        >
          <Link to="/dictionary">
            <DictionaryAdd />
          </Link>
        </li>

        <li className={s.listItem}>
          <Link to="/training">
            <Gamepad />
          </Link>
        </li>

        <li
          className={cn(s.listItem, {
            [s.active]: location.pathname === "/",
          })}
        >
          <Link to="/">
            <Home />
          </Link>
        </li>

        <li className={s.listItem}>
          <Link to="/rating">
            <Trophy />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigation;
