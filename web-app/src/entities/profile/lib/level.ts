export const levelXp = (totalXp?: number | null) => {
  if (!totalXp) return { currentUserLevelXp: 0 };

  // 1 lvl = 0-100
  // 2 lvl = 101-110
  // 3 lvl = 111-121
  // for 4 lvl need 133

  let nextLevelXp = 100;

  // console.log(`totalXp from props: ${totalXp}`);

  let currentUserLevelXp = 0;
  let totalUserXp = totalXp;

  for (let i = 0; nextLevelXp < totalUserXp; i++) {
    totalUserXp = totalUserXp - nextLevelXp;

    // console.log(`totalUserXp in for loop ${i}: ${totalUserXp}`);

    nextLevelXp = Number((nextLevelXp + nextLevelXp / 10).toFixed(0));
    // console.log(`nextLevelXp in for loop ${i}: ${nextLevelXp}`);

    currentUserLevelXp = i + 1;

    // console.log(`level ${currentUserLevelXp}: ${nextLevelXp}`);

    // console.log(`--- end of loop ${i} ---`);
  }

  let userXpOnCurrentLevel = totalUserXp;

  // console.log(`userXpOnCurrentLevel: ${userXpOnCurrentLevel}`);

  // console.log("---");

  const neededXpForNextLevel = nextLevelXp - userXpOnCurrentLevel;
  // console.log(`neededXpForNextLevel: ${neededXpForNextLevel}`);

  const percentageSuccess = (
    (userXpOnCurrentLevel * 100) /
    nextLevelXp
  ).toFixed(2);
  // console.log(`percentageSuccess: ${percentageSuccess}%`);

  const needPercentageToNextLevel = (100 - Number(percentageSuccess)).toFixed(
    2
  );
  // console.log(`needPercentageToNextLevel: ${needPercentageToNextLevel}%`);

  return {
    currentUserLevelXp,
    userXpOnCurrentLevel,
    nextLevelXp,
    neededXpForNextLevel,
    percentageSuccess,
    needPercentageToNextLevel,
  };
};

export const needXp = () => {};
