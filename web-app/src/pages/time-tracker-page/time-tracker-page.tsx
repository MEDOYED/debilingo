import { Clock, LabelTag } from "@shared/ui/icons";

import axios from "axios";
import { useEffect, useState } from "react";

import { FilledButton, TextButton } from "@shared/ui/buttons";

import type { TrackerTag } from "@entities/time-tag";
import { createTag, getTags } from "@entities/time-tag/api";
import { getTimeStats, type TimeStatsResponse } from "@entities/time-tracker";

import { convertTime } from "@shared/lib/time";

import {
  createTimeTracker,
  getActiveSession,
  startSession,
  stopSession,
  useTimeTrackerStore,
} from "@entities/time-tracker";
import { cn } from "@shared/lib/styles";
import field from "@shared/styles/components/field.module.scss";
import s from "./time-tracker-page.module.scss";

import type { TimeSession, TimeTrackerWithTag } from "@entities/time-tracker";
import { useLoadingTimer } from "./model/use-loading-timer";
import type { Period } from "@entities/time-tracker/model/types";
import { FilterPeriodButtons } from "./ui/FilterPeriodButtons/FilterPeriodButtons";

const COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#78716c",
];

// time summary page

export const TimeTrackerPage = () => {
  // modals state
  const [isAddTrackerOpen, setIsAddTrackerOpen] = useState<boolean>(false);
  const [isCreateTagModalOpen, setIsCreateTagModalOpen] =
    useState<boolean>(false);

  const [periodFilter, setPeriodFilter] = useState<Period>("all");

  // inputs state
  const [newTrackerTimeName, setNewTrackerTimeName] = useState<string | null>(
    null
  );
  const [createNewTagName, setCreateNewTagName] = useState<string>("");
  const [createNewTagColor, setCreateNewTagColor] = useState<string>("#8b5cf6");

  // status messages
  const [errorMessageOnCreateNewTag, setErrorMessageOnCreateNewTag] = useState<
    string | null
  >(null);

  // selected states
  const [selectedTag, setSelectedTag] = useState<TrackerTag | null>(null);

  // data state
  const [isLoadingAllData, setIsLoadingAllData] = useState<boolean>(true);
  const [tags, setTags] = useState<TrackerTag[]>([]);
  const [activeSession, setActiveSession] = useState<TimeSession | null>(null);
  const [dataTimeStats, setDataTimeStats] = useState<TimeStatsResponse | null>(
    null
  );

  // timers state
  const [currentSessionTimeSeconds, setCurrentSessionTimeSeconds] =
    useState<number>(0);

  // stores:
  const { timeTrackers, setTimeTrackers, loadTimeTrackers } =
    useTimeTrackerStore();

  useEffect(() => {
    // load all data on first open page
    const loadFirst = async () => {
      const dataAllTags = await getTags();
      setTags(dataAllTags);

      const dataActiveSession = await getActiveSession();
      setActiveSession(dataActiveSession);

      const dataTimeStats = await getTimeStats(periodFilter);
      setDataTimeStats(dataTimeStats);

      await loadTimeTrackers();

      setIsLoadingAllData(false);
    };

    loadFirst();
  }, [periodFilter]);

  const handleAddNewTimeTracker = async () => {
    if (!newTrackerTimeName) {
      setErrorMessageOnCreateNewTag("The input with new tag name is empty!");
      return;
    }

    if (!selectedTag) {
      setErrorMessageOnCreateNewTag("Select some tag!");
      return;
    }

    const newTimeTrackerData = {
      name: newTrackerTimeName,
      color: selectedTag.color,
      tag_id: selectedTag.id,
    };

    try {
      const newTimeTracker = await createTimeTracker(newTimeTrackerData);

      const oldTimeTrackers = timeTrackers ? timeTrackers : [];

      setTimeTrackers([...oldTimeTrackers, newTimeTracker]);
      setIsAddTrackerOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessageOnCreateNewTag(error.message);
      }
    }
  };

  const handleCreateNewTag = async () => {
    if (createNewTagName === "") {
      setErrorMessageOnCreateNewTag(
        "New tag name is empty! Fill it and try again"
      );
      return;
    }

    const newTagData = {
      name: createNewTagName,
      color: createNewTagColor,
    };

    try {
      const newTag = await createTag(newTagData);
      setTags([...tags, newTag]);

      setSelectedTag(newTag);
      setIsCreateTagModalOpen(false);
      setCreateNewTagName("");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setErrorMessageOnCreateNewTag(
          "Conflict! Maybe this tag already exist!"
        );
      }
      if (axios.isAxiosError(error)) {
        setErrorMessageOnCreateNewTag(
          "Something went wrong. We couldn't save your new tag right now. Please try again in a few moments."
        );
      }
    }
  };

  const handleTimeTrackerClick = async (timeTracker: TimeTrackerWithTag) => {
    console.log("activeSession: ", activeSession);

    if (activeSession === null) {
      const startedSession = await startSession(timeTracker.id);
      setActiveSession(startedSession);

      const dataTimeStats = await getTimeStats(periodFilter);
      setDataTimeStats(dataTimeStats);
    }

    if (activeSession && activeSession?.tracker_id !== timeTracker.id) {
      await stopSession(activeSession.id);
      setActiveSession(null);

      const startedSession = await startSession(timeTracker.id);
      setActiveSession(startedSession);

      const dataTimeStats = await getTimeStats(periodFilter);
      setDataTimeStats(dataTimeStats);
    }

    if (activeSession && activeSession?.tracker_id === timeTracker.id) {
      await stopSession(activeSession.id);
      setActiveSession(null);

      const dataTimeStats = await getTimeStats(periodFilter);
      setDataTimeStats(dataTimeStats);
    }
  };

  const { secondsString, minutesString, hoursString } = convertTime(
    currentSessionTimeSeconds
  );

  useEffect(() => {
    if (!activeSession) {
      setCurrentSessionTimeSeconds(0);
      return;
    }

    const tick = () => {
      const ms = Date.now() - new Date(activeSession.started_at).getTime();
      const secods = Math.floor(ms / 1000);
      setCurrentSessionTimeSeconds(secods);
    };

    tick();

    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [activeSession]);

  const todalTimeTrackerTime = (timeTracker: TimeTrackerWithTag) => {
    const tagsArr = dataTimeStats?.tags;
    const searchedTagGroup = tagsArr?.find(
      (item) => item.tag.name === timeTracker.tag.name
    );
    const searchedTimeTracker = searchedTagGroup?.trackers.find(
      (item) => item.id === timeTracker.id
    );
    const searchedTimeTrackerTotalSeconds = searchedTimeTracker?.total_seconds;

    const { hoursString, minutesString, secondsString } = convertTime(
      searchedTimeTrackerTotalSeconds
    );

    const convertedTotalTrackerTime = `${hoursString}:${minutesString}:${secondsString}`;

    return convertedTotalTrackerTime;
  };

  const { loadingTime } = useLoadingTimer(isLoadingAllData);

  return (
    <>
      {isLoadingAllData === true && <div>Loading {loadingTime}s</div>}

      {isLoadingAllData === false && (
        <main>
          <FilterPeriodButtons
            periodFilter={periodFilter}
            setPeriodFilter={setPeriodFilter}
          />

          <ul className={s.timeTrackers}>
            {timeTrackers?.map((timeTracker, index) => (
              <li
                className={cn(
                  s.timeTracker,
                  activeSession?.tracker_id === timeTracker.id &&
                    s.activeTracker
                )}
                style={{
                  backgroundColor:
                    activeSession?.tracker_id === timeTracker.id
                      ? timeTracker.tag?.color
                      : undefined,
                }}
                key={index}
                onClick={() => handleTimeTrackerClick(timeTracker)}
              >
                <Clock className={s.icon} />
                <div className={s.nameAndTagWrapper}>
                  <span>{timeTracker.name}</span>
                  <span className={s.tag}>Tag: {timeTracker.tag?.name}</span>
                </div>

                <div className={s.timeWrapper}>
                  <span className={s.todayTotalTime}>
                    {todalTimeTrackerTime(timeTracker)}
                  </span>
                  {activeSession?.tracker_id === timeTracker.id && (
                    <span className={s.stopwatch}>
                      {hoursString}:{minutesString}:{secondsString}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <FilledButton
            className={s.openAddNewTrackerModal}
            as="button"
            onClick={() => setIsAddTrackerOpen(true)}
          >
            Add new tracker
          </FilledButton>

          {/* modal create time tracker */}
          {isAddTrackerOpen && (
            <div className={s.modalAddTimeTrackerBackground}>
              <div className={s.modalWindow}>
                <div className={s.buttonsWrapper}>
                  <TextButton
                    as="button"
                    onClick={() => setIsAddTrackerOpen(false)}
                  >
                    Cancel
                  </TextButton>

                  <FilledButton
                    as="button"
                    onClick={handleAddNewTimeTracker}
                  >
                    Create tracker
                  </FilledButton>
                </div>

                <div className={s.inputsWrapper}>
                  <label className={field.label}>
                    Name:
                    <input
                      className={field.input}
                      type="text"
                      value={newTrackerTimeName ? newTrackerTimeName : ""}
                      onChange={(e) => setNewTrackerTimeName(e.target.value)}
                    />
                  </label>

                  <div className={field.label}>
                    Tag:
                    <ul>
                      {tags.map((tag, index) => (
                        <li key={index}>
                          <TextButton
                            className={cn(selectedTag === tag && s.selectedTag)}
                            as="button"
                            onClick={() => setSelectedTag(tag)}
                          >
                            <LabelTag color={tag.color} />
                            {tag.name}
                          </TextButton>
                        </li>
                      ))}
                    </ul>
                    {/* tag list */}
                    <TextButton
                      as="button"
                      onClick={() => setIsCreateTagModalOpen(true)}
                    >
                      Create new tag
                    </TextButton>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isCreateTagModalOpen && (
            <div className={s.CreateTagModal}>
              <label className={field.label}>
                Tag:
                <input
                  className={field.input}
                  type="text"
                  value={createNewTagName}
                  onChange={(e) => setCreateNewTagName(e.target.value)}
                />
              </label>

              <div className={field.label}>
                color:
                <ul className={s.colorsList}>
                  {COLORS.map((color, index) => (
                    <li
                      className={s.colorListItem}
                      key={index}
                    >
                      <button
                        onClick={() => setCreateNewTagColor(color)}
                        className={cn(
                          s.colorButton,
                          createNewTagColor === color && s.selectedTagColor
                        )}
                        style={{ backgroundColor: color }}
                      ></button>
                    </li>
                  ))}
                </ul>
              </div>

              <FilledButton
                as="button"
                onClick={handleCreateNewTag}
              >
                Create new Tag
              </FilledButton>

              <TextButton
                as="button"
                onClick={() => setIsCreateTagModalOpen(false)}
              >
                Cancel
              </TextButton>
            </div>
          )}

          {/* modal Error Message On Create New Tag  */}
          {errorMessageOnCreateNewTag && (
            <div className={s.infoErrorModal}>
              <FilledButton
                className={s.closeBtn}
                as="button"
                onClick={() => setErrorMessageOnCreateNewTag(null)}
                variant="error"
              >
                ⛌
              </FilledButton>

              <span>{errorMessageOnCreateNewTag}</span>
            </div>
          )}
        </main>
      )}
    </>
  );
};
