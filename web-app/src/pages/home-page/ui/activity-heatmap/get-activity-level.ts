import type { ActivityLevel } from "./types";

export const getActivityLevel = (symbolsCount: number): ActivityLevel => {
  if (symbolsCount === 0) return 0;
  if (symbolsCount < 300) return 1;
  if (symbolsCount < 600) return 2;
  if (symbolsCount < 1800) return 3;
  return 4;
};
