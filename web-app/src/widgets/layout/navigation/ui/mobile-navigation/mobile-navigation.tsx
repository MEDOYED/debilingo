import { Link } from "react-router-dom";

import { DictionaryAdd, Gamepad, Home, Trophy } from "@/shared/ui/icons";

import s from "./mobile-navigation.module.scss";

const MobileNavigation = () => {
  return (
    <nav
      className={s.navigation}
      aria-label="Головна навігація"
    >
      <ul className={s.list}>
        <li className={s.listItem}>
          <Link to="/dictionary">
            <DictionaryAdd />
          </Link>
        </li>

        <li className={s.listItem}>
          <Link to="/training">
            <Gamepad />
          </Link>
        </li>

        <li className={s.listItem}>
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
