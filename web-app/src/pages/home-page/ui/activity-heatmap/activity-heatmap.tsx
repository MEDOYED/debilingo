import { useEffect, useRef, useState } from "react";

import { getLocalDate } from "./get-local-date";

import { generateHeatmapGrid } from "./generate-heatmap-grid";

import s from "./activity-heatmap.module.scss";

import type { LanguageDailyActivityData } from "./types";

type ActivityHeatmapProps = {
  dailyStats: LanguageDailyActivityData[];
};

export const ActivityHeatmap = ({ dailyStats }: ActivityHeatmapProps) => {
  const heatmapData = generateHeatmapGrid(dailyStats);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const todayDate = getLocalDate();

  const [selectedDate, setSelectedDate] = useState<string>(todayDate);

  //  initial scroll heatmap to end
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    scrollElement.scrollLeft = 10000;
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      scrollElement.scrollLeft += e.deltaY;
    };

    scrollElement.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      scrollElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const timeCountInSelectedDate = dailyStats.find(
    (dayStats) => dayStats.date === selectedDate
  );

  return (
    <section className={s.section}>
      <div>
        {selectedDate}: {timeCountInSelectedDate?.study_time_seconds || 0}{" "}
        seconds
      </div>

      <div
        className={s.gridWrapper}
        ref={scrollRef}
      >
        {heatmapData.map((week, index) => (
          <div
            className={s.week}
            key={index}
          >
            {week.map((day) => (
              <div
                className={`${s.day} ${s[`level_${day.activityLevel}`]} ${day.date === selectedDate && s.selectedActive}`}
                onClick={() => setSelectedDate(day.date)}
                key={day.date}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
