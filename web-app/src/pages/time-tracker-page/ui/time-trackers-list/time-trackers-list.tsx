import type { TimeTrackerWithTag } from "@entities/time-tracker";
import { Clock } from "@shared/ui/icons";

import s from "./time-trackers-list.module.scss";

type TimeTrackersListProps = {
  timeTrackers: TimeTrackerWithTag[];
};

export const TimeTrackersList = ({ timeTrackers }: TimeTrackersListProps) => {
  return (
    <ul className={s.timeTrackers}>
      {timeTrackers.map((timeTracker, index) => (
        <li
          className={s.timeTracker}
          key={index}
        >
          <Clock className={s.icon} />
          <div className={s.nameAndTagWrapper}>
            <span>{timeTracker.name}</span>
            <span className={s.tag}>тег: {timeTracker.tag?.name}</span>
          </div>
          <span className={s.time}>00:05:02</span>
        </li>
      ))}
    </ul>
  );
};
