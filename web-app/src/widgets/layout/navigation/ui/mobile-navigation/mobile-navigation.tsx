import { Link } from "react-router-dom";

import { ArrowLongRight, DictionaryAdd } from "@/shared/ui/icons";

import s from "./mobile-navigation.module.scss";

const MobileNavigation = () => {
  return (
    <nav
      className={s.navigation}
      aria-label="Головна навігація"
    >
      <ul className={s.list}>
        <li className={s.listItem}>
          <Link to="/">
            <DictionaryAdd />
          </Link>
        </li>

        <li className={s.listItem}>
          <Link to="/profile">
            <ArrowLongRight />
          </Link>
        </li>

        <li className={s.listItem}>
          <Link to="/profile">
            <ArrowLongRight />
          </Link>
        </li>

        <li className={s.listItem}>
          <Link to="/profile">
            <ArrowLongRight />
          </Link>
        </li>

        <li className={s.listItem}>
          <Link to="/profile">
            <ArrowLongRight />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigation;
