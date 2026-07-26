import type { NavItem } from "../model/types";

// nav items for client side (for all users)
export const NAV_ITEMS: NavItem[] = [
  {
    to: "/",
    text: "Головна",
  },
  {
    text: "Іноземні мови",
    dropDownList: [
      {
        to: "/dictionaries",
        text: "Всі словники",
      },
      {
        to: "/leaderboards",
        text: "Рейтинги",
      },
    ],
  },
  {
    to: "/time-tracker",
    text: "Трекери часу",
  },
  {
    to: "/money-earning",
    text: "Заробляння грошей",
  },
];
