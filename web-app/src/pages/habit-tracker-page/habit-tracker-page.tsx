import { FilledButton, TextButton } from "@shared/ui/buttons";

import { useEffect, useState } from "react";

import field from "@shared/styles/components/field.module.scss";
import s from "./habit-tracker-page.module.scss";

import type {
  HabitSessionsResponse,
  TimeTracker,
} from "@entities/time-tracker";

import {
  getHabitSessions,
  updateHabitTimeGoal,
  useTimeTrackerStore,
} from "@entities/time-tracker";

const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const HabitTrackerPage = () => {
  // loading state
  const [isLoadingAllData, setIsLoadingAllData] = useState<boolean>(true);

  // data state
  const [habitTrackerDaysStats, setHabitTrackerDaysStats] =
    useState<HabitSessionsResponse | null>(null);

  // modals state
  const [isOpenAddHabitModal, setIsOpenAddHabitModal] =
    useState<boolean>(false);

  // input values
  const [timeGoalInputValue, setTimeGoalInputValue] = useState<string>("");

  // selected values
  const [selectedTimeTrackerId, setSelectedTimeTrackerId] = useState<
    TimeTracker["id"] | null
  >(null);

  const { timeTrackers, loadTimeTrackers, statusTimeTracker, setTimeTrackers } =
    useTimeTrackerStore();

  // load all data on first open page
  useEffect(() => {
    const loadFirst = async () => {
      const today = new Date();
      const endDate = formatLocalDate(today);

      const dataHabitTrackerDaysStats: HabitSessionsResponse =
        await getHabitSessions("2026-07-30", endDate);

      setHabitTrackerDaysStats(dataHabitTrackerDaysStats);

      setIsLoadingAllData(false);
    };

    loadFirst();
  }, []);

  useEffect(() => {
    if (statusTimeTracker === "idle") {
      loadTimeTrackers();
    }
  }, [statusTimeTracker, loadTimeTrackers]);

  const handleCreateHabit = async () => {
    if (!timeTrackers) {
      console.error(timeTrackers, "is requierd");
      return;
    }

    const timeGoalSecondsNumber = Number(timeGoalInputValue);
    if (
      !selectedTimeTrackerId ||
      selectedTimeTrackerId === null ||
      isNaN(timeGoalSecondsNumber)
    )
      return;

    const updatedTracker = await updateHabitTimeGoal(
      selectedTimeTrackerId,
      timeGoalSecondsNumber
    );

    const trackersWithoutOldChangedTracker = timeTrackers.filter(
      (timeTracker) => timeTracker.id !== updatedTracker.id
    );

    setTimeTrackers([updatedTracker, ...trackersWithoutOldChangedTracker]);
  };

  const generateDateRange = (start: string, end: string): string[] => {
    const dates: string[] = [];
    const current = new Date(start + "T00:00:00Z");
    const last = new Date(end + "T00:00:00Z");
    while (current <= last) {
      dates.push(current.toISOString().slice(0, 10));
      current.setUTCDate(current.getUTCDate() + 1);
    }
    return dates;
  };

  const dateColumns = habitTrackerDaysStats
    ? generateDateRange(
        habitTrackerDaysStats.start_date,
        habitTrackerDaysStats.end_date
      )
    : [];

  const formatDate = (date: string): string =>
    date.split("-").reverse().join(".");

  return (
    <main>
      {statusTimeTracker === "loading" && isLoadingAllData === true && (
        <div>Loading...</div>
      )}

      <TextButton
        as="button"
        onClick={() => setIsOpenAddHabitModal(true)}
      >
        + new habit
      </TextButton>

      {/* Habit trackers list */}
      <div className={s.tableWrapper}>
        <ul>
          {habitTrackerDaysStats?.trackers.map((tracker, index) => (
            <li key={index}>
              <div>--------</div>
              <div>{tracker.name}</div>
              <div>{tracker.tag?.name}</div>
              <div>{tracker.habit_time_goal}</div>
              <div>--------</div>
            </li>
          ))}
        </ul>

        <table>
          <thead>
            <tr>
              {dateColumns.map((date, index) => (
                <th
                  key={index}
                  scope="col"
                >
                  {formatDate(date)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {habitTrackerDaysStats &&
              habitTrackerDaysStats.trackers.map((tracker, index) => (
                <tr key={index}>
                  {dateColumns.map((date) => (
                    <th
                      key={date}
                      scope="row"
                    >
                      {tracker.days[date]?.total_seconds ?? 0}
                    </th>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isOpenAddHabitModal && (
        <div className={s.addHabitModal}>
          <TextButton
            as="button"
            onClick={() => setIsOpenAddHabitModal(false)}
          >
            X
          </TextButton>

          {statusTimeTracker === "loading" && <div>Loading...</div>}

          {statusTimeTracker === "error" && (
            <div>Error loading time trackers</div>
          )}

          {statusTimeTracker === "loaded" && (
            <>
              <h2>
                What is your time goal per day for this habit? (in seconds)
              </h2>

              <input
                className={field.input}
                type="number"
                value={timeGoalInputValue}
                onChange={(e) => setTimeGoalInputValue(e.target.value)}
              />

              <h2>Select time tracker what you want to add as new habit:</h2>

              <ul>
                {timeTrackers?.map((timeTracker, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedTimeTrackerId(timeTracker.id)}
                  >
                    <div>{timeTracker.name}</div>
                  </li>
                ))}
              </ul>

              <FilledButton
                as="button"
                onClick={handleCreateHabit}
              >
                Create habit
              </FilledButton>
            </>
          )}
        </div>
      )}
    </main>
  );
};
