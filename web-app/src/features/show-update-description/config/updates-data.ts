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
    version: "0.4",
    date: "31.07.2026",
    manHours: "23",
    features: [
      "Increase xp at the same value of daily streak when daily streak is increase by one. For example if you have 23 days in daily streak and you on next day click on spoiler you increase your total xp count by +24xp for 24 daily streak and +1xp for spoiler. Note: that work one time per day",
      "Allow users to manually stop the XP timer by clicking on it and send the accumulated study data",
      "Allow users to play words in the main dictionary column by clicking on them",
      "Add the ability to open real-life video examples of words through YouGlish from the detailed word information section",
    ],
    improvements: [
      "Impove modal for creation new word on dictionary page: improve clear and delete unnecessary inputs, add icons for that actions (clear and delete), add padding-right for this buttons",
    ],
    fixes: [
      "Fix 404 errors when accessing dictionary routes after page reload or prolonged inactivity",
    ],
    contributors: ["Medoyed", "Riazanov Daniil"],
  },
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
