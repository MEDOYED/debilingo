/**
 * Converts a total number of seconds into hours, minutes, and remaining seconds.
 *
 * @param totalSeconds - The total number of seconds to convert.
 *
 * @returns An object  {
      hoursString,
      minutesString,
      secondsString,
    }; containing the equivalent hours, minutes and seconds. All values are string. 
 */
export const convertTime = (totalSeconds?: number) => {
  let hoursString: string;
  let minutesString: string;
  let secondsString: string;

  if (!totalSeconds)
    return {
      hoursString: "00",
      minutesString: "00",
      secondsString: "00",
    };

  const hours = Math.trunc(totalSeconds / 3600);

  if (hours < 10) {
    hoursString = `0${hours}`;
  } else {
    hoursString = `${hours}`;
  }

  const secondsLeftAfterHoursCalculation = totalSeconds - hours * 3600;

  const minutes = Math.trunc(secondsLeftAfterHoursCalculation / 60);

  if (minutes < 10) {
    minutesString = `0${minutes}`;
  } else {
    minutesString = `${minutes}`;
  }

  const seconds = secondsLeftAfterHoursCalculation - minutes * 60;

  if (seconds < 10) {
    secondsString = `0${seconds}`;
  } else {
    secondsString = `${seconds}`;
  }

  return {
    hoursString,
    minutesString,
    secondsString,
  };
};
