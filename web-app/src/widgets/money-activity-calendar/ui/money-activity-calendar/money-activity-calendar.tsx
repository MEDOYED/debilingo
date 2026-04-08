import { useEffect, useState } from "react";

import { cn } from "@shared/lib/styles";

import { addActivity, getActivity, getStats } from "../../api/activityService";
import s from "./money-activity-calendar.module.scss";

interface DayActivity {
  date: string;
  money_count: number; // stores dollars amount
}

interface ActivityData {
  [date: string]: number; // dollars amount
}

interface TooltipData {
  date: string;
  amount: number; // dollars
  x: number;
  y: number;
}

type MoneyActivityCalendarProps = {
  className?: string;
};

export const MoneyActivityCalendar = ({
  className,
}: MoneyActivityCalendarProps) => {
  const [activityData, setActivityData] = useState<ActivityData>({});
  const [totalEarned, setTotalEarned] = useState<number>(0);
  const [moneyInput, setMoneyInput] = useState<string>("");
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [activities, stats] = await Promise.all([
        getActivity(),
        getStats(),
      ]);

      const dataMap: ActivityData = {};
      activities.forEach((activity: DayActivity) => {
        dataMap[activity.date] = activity.money_count; // money_count stores dollars
      });

      setActivityData(dataMap);
      setTotalEarned(stats.total);
    } catch (error) {
      showMessage("error", "Failed to load activity data");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = parseInt(moneyInput);
    if (isNaN(amount) || amount < 0 || amount > 100000) {
      showMessage(
        "error",
        "Please enter a valid amount between $0 and $100,000"
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await addActivity(amount);
      showMessage(
        "success",
        `Added $${amount.toLocaleString()} to today's earnings!`
      );
      setMoneyInput("");
      await fetchData();
    } catch (error) {
      showMessage("error", "Failed to save activity");
      console.error("Error saving activity:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const generateCalendarData = () => {
    const weeks: Date[][] = [];
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Find the first Sunday before or on oneYearAgo
    const startDate = new Date(oneYearAgo);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    let currentDate = new Date(startDate);

    for (let week = 0; week < 53; week++) {
      const weekDays: Date[] = [];
      for (let day = 0; day < 7; day++) {
        weekDays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(weekDays);
    }

    return weeks;
  };

  // Convert dollars to hundreds for display (600 -> 6)
  const dollarsToHundreds = (dollars: number): number => {
    return Math.floor(dollars / 100);
  };

  // Get activity level based on hundreds of dollars
  const getActivityLevel = (dollars: number): number => {
    const hundreds = dollarsToHundreds(dollars);
    if (hundreds === 0) return 0;
    if (hundreds <= 2) return 1;
    if (hundreds <= 5) return 2;
    if (hundreds <= 10) return 3;
    return 4;
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const formatDateForDisplay = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getMonthLabels = (weeks: Date[][]) => {
    const months: { name: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDay = week[0];
      const month = firstDay.getMonth();

      if (month !== lastMonth && weekIndex < weeks.length - 1) {
        months.push({
          name: firstDay.toLocaleDateString("en-US", { month: "short" }),
          weekIndex,
        });
        lastMonth = month;
      }
    });

    return months;
  };

  const handleMouseEnter = (
    date: Date,
    amount: number,
    e: React.MouseEvent
  ) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltip({
      date: formatDateForDisplay(date),
      amount,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const weeks = generateCalendarData();
  const months = getMonthLabels(weeks);
  const dayLabels = ["Mon", "Wed", "Fri"];

  if (isLoading) {
    return (
      <div className={s.moneyActivityCalendar}>
        <div className={s.loading}>Loading activity data...</div>
      </div>
    );
  }

  return (
    <div className={cn(s.moneyActivityCalendar, className)}>
      <div className={s.calendarWithCaprionWrapper}>
        <div className={s.calendarWrapper}>
          <div className={s.dayLabels}>
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <div
                key={day}
                className={s.dayLabel}
              >
                {day === 1
                  ? dayLabels[0]
                  : day === 3
                    ? dayLabels[1]
                    : day === 5
                      ? dayLabels[2]
                      : ""}
              </div>
            ))}
          </div>

          <div className={s.calendarContent}>
            <div className={s.monthLabels}>
              {months.map((month, idx) => (
                <div
                  key={idx}
                  className={s.monthLabel}
                  style={{ gridColumn: month.weekIndex + 1 }}
                >
                  {month.name}
                </div>
              ))}
            </div>

            <div className={s.weeksGrid}>
              {weeks.map((week, weekIdx) => (
                <div
                  key={weekIdx}
                  className={s.week}
                >
                  {week.map((date, dayIdx) => {
                    const dateStr = formatDate(date);
                    const dollarAmount = activityData[dateStr] || 0;
                    const hundreds = dollarsToHundreds(dollarAmount);
                    const level = getActivityLevel(dollarAmount);
                    const isToday = formatDate(new Date()) === dateStr;
                    const isFuture = date > new Date();

                    return (
                      <div
                        key={dayIdx}
                        className={`${s.day} ${s[`level${level}`]} ${isToday ? s.today : ""} ${isFuture ? s.future : ""}`}
                        onMouseEnter={(e) =>
                          handleMouseEnter(date, dollarAmount, e)
                        }
                        onMouseLeave={handleMouseLeave}
                        data-date={dateStr}
                        data-hundreds={hundreds}
                      ></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={s.caption}>
          <h2 className={s.title}>
            ${totalEarned.toLocaleString()} earned in the last year
          </h2>

          <div className={s.legend}>
            <span className={s.legendText}>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`${s.legendBox} ${s[`level${level}`]}`}
              />
            ))}
            <span className={s.legendText}>More</span>
          </div>
        </div>
      </div>

      <div className={s.inputSection}>
        <h3 className={s.inputTitle}>Log Today's Earnings</h3>
        <form
          onSubmit={handleSubmit}
          className={s.form}
        >
          <div className={s.inputGroup}>
            <label
              htmlFor="moneyAmount"
              className={s.label}
            >
              Amount earned today ($):
            </label>
            <input
              id="moneyAmount"
              type="number"
              min="0"
              max="100000"
              step="1"
              value={moneyInput}
              onChange={(e) => setMoneyInput(e.target.value)}
              placeholder="Enter amount (e.g., 600 for $600)"
              className={s.input}
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className={s.submitButton}
            disabled={isSubmitting || !moneyInput}
          >
            {isSubmitting ? "Saving..." : "Save Earnings"}
          </button>
        </form>

        {message && (
          <div className={`${s.message} ${s[message.type]}`}>
            {message.text}
          </div>
        )}
      </div>

      {tooltip && (
        <div
          className={s.tooltip}
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
          }}
        >
          <strong>${tooltip.amount.toLocaleString()}</strong> (
          {dollarsToHundreds(tooltip.amount)} hundreds) on {tooltip.date}
        </div>
      )}
    </div>
  );
};
