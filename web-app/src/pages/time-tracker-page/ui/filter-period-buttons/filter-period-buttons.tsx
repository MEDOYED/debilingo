import { useRef, useState } from "react";

import s from "./filter-period-buttons.module.scss";

type Period = "all" | "1d" | "7d" | "30d";

type Periods = {
  period: Period;
  text: string;
};

interface FilterPeriodButtonsProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: Period) => void;
}

export const FilterPeriodButtons = ({
  selectedPeriod,
  setSelectedPeriod,
}: FilterPeriodButtonsProps) => {
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
  });

  const updateIndicator = (index: number) => {
    const button = buttonsRef.current[index];

    if (!button) return;

    setIndicator({
      left: button.offsetLeft,
      width: button.offsetWidth,
    });
  };

  const periods: Periods[] = [
    {
      period: "1d",
      text: "1 day",
    },
    {
      period: "7d",
      text: "7 days",
    },
    {
      period: "30d",
      text: "30 days",
    },
    {
      period: "all",
      text: "all time",
    },
  ];

  return (
    <div className={s.group}>
      <div className={s.container}>
        <div
          className={s.indicator}
          style={{
            transform: `translateX(${indicator.left}px)`,
            width: `${indicator.width}px`,
          }}
        />
        {periods.map((item, index) => {
          const isSelected = item.period === selectedPeriod;

          return (
            <button
              key={item.period}
              ref={(element) => {
                buttonsRef.current[index] = element;
              }}
              type="button"
              className={`${s.button} ${isSelected ? s.selected : ""}`}
              aria-pressed={isSelected}
              onClick={() => {
                setSelectedPeriod(item.period);
                updateIndicator(index);
              }}
            >
              {item.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};
