import { Clock } from "@shared/ui/icons";

import { useState } from "react";

import { FilledButton, TextButton } from "@shared/ui/buttons";

import field from "@shared/styles/components/field.module.scss";
import s from "./time-tracker-page.module.scss";

const LIST_DATA = [
  {
    name: "YouTube",
    tag: "Пройобування життя",
    time: "00:06:04",
  },
  {
    name: "YouTube",
    tag: "Пройобування життя",
    time: "00:06:04",
  },
  {
    name: "YouTube",
    tag: "Пройобування життя",
    time: "00:06:04",
  },
];

// time summary page

export const TimeTrackerPage = () => {
  const [isAddTrackerOpen, setIsAddTrackerOpen] = useState<boolean>(false);
  const [isCreateTagModalOpen, setIsCreateTagModalOpen] =
    useState<boolean>(false);

  const [name, setName] = useState<string>("");

  const handleAddNewTimeTracker = () => {};

  return (
    <main>
      <h1 className="container">time tracker page</h1>

      <ul className={s.timeTrackers}>
        {LIST_DATA.map((item, index) => (
          <li
            className={s.timeTracker}
            key={index}
          >
            <Clock className={s.icon} />
            <div className={s.nameAndTagWrapper}>
              <span>{item.name}</span>
              <span className={s.tag}>тег: {item.tag}</span>
            </div>
            <span className={s.time}>{item.time}</span>
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

      {/* modal add time tracker */}
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
                Add tracker
              </FilledButton>
            </div>

            <div className={s.inputsWrapper}>
              <label className={field.label}>
                Назва:
                <input
                  className={field.input}
                  type="text"
                  value={name}
                  onChange={(e) => e.target.value}
                />
              </label>

              <label className={field.label}>
                Тег:
                {/* tag list */}
                <TextButton
                  as="button"
                  onClick={() => setIsCreateTagModalOpen(true)}
                >
                  Create new tag
                </TextButton>
              </label>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
