import type { NavItem } from "../model/types";

// nav items for client side (for all users)
export const NAV_ITEMS: NavItem[] = [
  {
    to: "/",
    text: "Home",
  },
  {
    text: "Foreign languages",
    dropDownList: [
      {
        to: "/dictionaries",
        text: "All dictionaries",
      },
      {
        to: "/leaderboards",
        text: "Ratings",
      },
    ],
  },
  {
    to: "/time-tracker",
    text: "Time trackers",
  },
  {
    to: "/money-earning",
    text: "Making money",
  },
];
