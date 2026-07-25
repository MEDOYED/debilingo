import { useEffect, useState } from "react";

export const useLoadingTimer = (isActive: boolean) => {
  const [loadingTime, setLoadingTime] = useState("0,00");

  useEffect(() => {
    if (!isActive) return;

    const startTime = performance.now();
    let animationFrameId: number;

    const updateTimer = () => {
      const elapsed = performance.now() - startTime;

      const seconds = Math.floor(elapsed / 1000);
      const hundredths = Math.floor((elapsed % 1000) / 10);

      setLoadingTime(`${seconds},${String(hundredths).padStart(2, "0")}`);

      animationFrameId = requestAnimationFrame(updateTimer);
    };

    updateTimer();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  return { loadingTime };
};
