type UpdatesData = {
  version: string;
  date: string;
  manHours: string;
  features: string[] | null;
  improvements: string[] | null;
  fixes: string[] | null;
  contributors: string[];
};

export const UPDATES_DATA: UpdatesData[] = [
  {
    version: "0.3",
    date: "03.07.2026",
    manHours: "22",
    features: [
      "Create new page: Time tracker. On this page you can track your time and how you spend your life! You can create your own time trackers and group them using  your own tags. Example usage: you create new tag with name 'sport' and create a few trackers for exampme 'gym' and use this tag 'sport'. You can create unlimitad tags and time trackers. Recomended to use time tracker 24/7, even your sleeping. In future updates you will can see all full statistics for ",
    ],
    improvements: ["Version modal window refactor"],
    fixes: null,
    contributors: ["Medoyed"],
  },
  {
    version: "0.2",
    date: "24.06.2026",
    manHours: "24",
    features: [
      "Modal window with update versions descriptions",
      "The ability to edit words",
    ],
    improvements: ["Loading speed of the words"],
    fixes: [
      "Fixed appearance the annoying left/right action buttons when scrolling vertically through the dictionary.",
      "Fixed an issue where words from the previous dictionary remained visible while new w loading during a dictionary switch.",
    ],
    contributors: ["Medoyed"],
  },
];
