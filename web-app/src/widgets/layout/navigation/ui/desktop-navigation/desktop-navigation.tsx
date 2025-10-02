import { Link } from "react-router-dom";

import { ArrowLongRight } from "@/shared/ui/icons";

import s from "./desktop-navigation.module.scss";

export const DesktopNavigation = () => {
  return (
    <nav className={s.navigation}>
      <ul>
        <li>
          <Link to={"/"}>
            <ArrowLongRight />
          </Link>
        </li>

        <li>
          <Link to={"/"}>
            <ArrowLongRight />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
