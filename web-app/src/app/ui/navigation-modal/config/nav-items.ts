import type { NavItem } from "../model/types";

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
    to: "/habit-tracker",
    text: "Habit trackers",
  },
  {
    to: "/money-earning",
    text: "Making money",
  },
];
