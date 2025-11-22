import { useEffect, useState } from "react";
import {
  addActivity,
  getActivity,
  getStats,
} from "../../../../shared/api/activityService";
import styles from "./money-activity-calendar.module.scss";

interface DayActivity {
  date: string;
  word_count: number; // stores dollars amount
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

export const MoneyActivityCalendar = () => {
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
        dataMap[activity.date] = activity.word_count; // word_count stores dollars
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
    if (hundreds <= 5) return 1;
    if (hundreds <= 15) return 2;
    if (hundreds <= 30) return 3;
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
      <div className={styles.container}>
        <div className={styles.loading}>Loading activity data...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          ${totalEarned.toLocaleString()} earned in the last year
        </h2>
      </div>

      <div className={styles.calendarWrapper}>
        <div className={styles.dayLabels}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => (
            <div
              key={day}
              className={styles.dayLabel}
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

        <div className={styles.calendarContent}>
          <div className={styles.monthLabels}>
            {months.map((month, idx) => (
              <div
                key={idx}
                className={styles.monthLabel}
                style={{ gridColumn: month.weekIndex + 1 }}
              >
                {month.name}
              </div>
            ))}
          </div>

          <div className={styles.weeksGrid}>
            {weeks.map((week, weekIdx) => (
              <div
                key={weekIdx}
                className={styles.week}
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
                      className={`${styles.day} ${styles[`level${level}`]} ${isToday ? styles.today : ""} ${isFuture ? styles.future : ""}`}
                      onMouseEnter={(e) =>
                        handleMouseEnter(date, dollarAmount, e)
                      }
                      onMouseLeave={handleMouseLeave}
                      data-date={dateStr}
                      data-hundreds={hundreds}
                    >
                      {hundreds > 0 && (
                        <span className={styles.dayNumber}>{hundreds}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendText}>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`${styles.legendBox} ${styles[`level${level}`]}`}
          />
        ))}
        <span className={styles.legendText}>More</span>
      </div>

      <div className={styles.inputSection}>
        <h3 className={styles.inputTitle}>Log Today's Earnings</h3>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.inputGroup}>
            <label
              htmlFor="moneyAmount"
              className={styles.label}
            >
              Amount earned today ($):
            </label>
            <input
              id="moneyAmount"
              type="number"
              min="0"
              max="100000"
              step="100"
              value={moneyInput}
              onChange={(e) => setMoneyInput(e.target.value)}
              placeholder="Enter amount (e.g., 600 for $600)"
              className={styles.input}
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || !moneyInput}
          >
            {isSubmitting ? "Saving..." : "Save Earnings"}
          </button>
        </form>

        {message && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}
      </div>

      {tooltip && (
        <div
          className={styles.tooltip}
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
