import s from "./nav-link-item.module.scss";

import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { useNavigationStore } from "@features/toggle-modal-navigation";
import { useWindowSize } from "@shared/lib/responsive";
import { cn } from "@shared/lib/styles";
import { TextButton } from "@shared/ui/buttons";

type NavLinkItemProps = {
  to: string;
  text: string;
};

export const NavLinkItem = ({ to, text }: NavLinkItemProps) => {
  const { toggleIsNavigationOpen } = useNavigationStore();
  const [isActive, setIsActive] = useState<boolean | null>();

  const location = useLocation();

  const locationPathname = location.pathname;
  console.log("location pathname: ", locationPathname);

  useEffect(() => {
    setIsActive(locationPathname === to);
    // if (to === "/") {
    //   setIsActive(locationPathname === "/");
    // } else {
    // setIsActive(locationPathname.includes(to));
    // }
  }, [locationPathname, to]);

  const { windowWidth } = useWindowSize();

  return (
    <TextButton
      as="nav-link"
      to={to}
      onClick={toggleIsNavigationOpen}
      className={cn(isActive && s.active)}
      size={windowWidth > 768 ? "large" : "medium"}
    >
      {text}
    </TextButton>
  );
};
