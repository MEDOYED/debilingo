import { Link, useLocation } from "react-router-dom";

import { cn } from "@/shared/lib/utils/classnames/classnames";
import { DictionaryAdd, Gamepad, Home, Trophy } from "@/shared/ui/icons";

import s from "./mobile-navigation.module.scss";

const navigationListData = [
  {
    to: "/dictionary",
    icon: <DictionaryAdd />,
  },
  {
    to: "/training",
    icon: <Gamepad />,
  },
  {
    to: "/",
    icon: <Home />,
  },
  {
    to: "/rating",
    icon: <Trophy />,
  },
];

const MobileNavigation = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <nav
      className={s.navigation}
      aria-label="Головна навігація"
    >
      <ul className={s.list}>
        {navigationListData.map((item, index) => (
          <li
            className={cn(s.listItem, {
              [s.active]: location.pathname === item.to,
            })}
            key={index}
          >
            <Link to={item.to}>{item.icon}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNavigation;
