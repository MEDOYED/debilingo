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
    version: "0.8.0",
    date: "22.08.2026",
    manHours: "14",
    features: [
      "Added a Quiz game with a progress bar, dictionary selection, XP rewards for correct answers, answer validation, incorrect answer handling, and sound effects for correct and incorrect answers.",
    ],
    improvements: null,
    fixes: null,
    contributors: ["Riazanov Daniil, Mokriakov Maksym"],
  },
  {
    version: "0.7.9",
    date: "19.08.2026",
    manHours: "16",
    features: [
      "Now in edit word mode you can add more examples, definitions and translations",
      "Add period 1d, 7d, 30d, all time for time tracker page",
    ],
    improvements: [
      "If in edit mode you don't change anything and click on save button, it save instantly without loading time",
    ],
    fixes: [
      "After unpinning a word it jumped to the top of the dictionary. Now it goes right under the pinned words and takes its place by date",
    ],
    contributors: [
      "Riazanov Daniil, Maksym Mokriakov [Medoed], Selim Gandymov",
    ],
  },
  {
    version: "0.7.5",
    date: "01.08.2026",
    manHours: "24",
    features: [
      "New page - Habit tracker based on Time tracker page. Help users make a new habits, helps do some things consistency day after day",
    ],
    improvements: ["Display study time in HH:MM:SS format on the leaderboard."],
    fixes: [
      "Error on habit tracker page when add tracker without some time sessions in date range",
    ],
    contributors: ["Selim Gandymov, Maksym Mokriakov [Medoed]"],
  },
  {
    version: "0.6.3",
    date: "27.07.2026",
    manHours: "6",
    features: null,
    improvements: ["translate all static text to english"],
    fixes: [
      'Fix voice speech on some iPhones and android. Try to use "Samantha" voice for all spoilers by default',
    ],
    contributors: ["Riazanov Daniil, Medoyed (Maksym Mokriakov)"],
  },
  {
    version: "0.6.1",
    date: "26.07.2026",
    manHours: "2",
    features: ["Navigation menu", "Move money activity calendar to apart page"],
    improvements: null,
    fixes: null,
    contributors: ["Medoyed"],
  },
  {
    version: "0.5.1",
    date: "25.07.2026",
    manHours: "5",
    features: [
      "Add a stopwatch loading indicator to the time tracking page.",
      "shuffle and unshuffle words in dictionary page",
    ],
    improvements: null,
    fixes: null,
    contributors: ["Medoyed", "Riazanov Daniil"],
  },
  {
    version: "0.4",
    date: "23.07.2026",
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
