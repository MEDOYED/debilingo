export const calculateXpByTimeDuration = ({
  durationTimeSeconds,
  secondsPerOneXp = 10,
}: {
  durationTimeSeconds: number;
  secondsPerOneXp?: number;
}) => {
  const xpForTime = Math.trunc(durationTimeSeconds / secondsPerOneXp);

  return { xpForTime };
};
