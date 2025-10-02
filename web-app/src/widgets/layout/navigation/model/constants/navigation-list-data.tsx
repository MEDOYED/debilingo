import { DictionaryAdd, Gamepad, Home, Trophy } from "@/shared/ui/icons";

export const navigationListData = [
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
