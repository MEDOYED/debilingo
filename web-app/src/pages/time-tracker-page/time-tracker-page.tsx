import { Clock } from "@shared/ui/icons";

import { useEffect, useState } from "react";

import { FilledButton, TextButton } from "@shared/ui/buttons";

import type { TrackerTag } from "@entities/time-tag";
import { createTag, getTags } from "@entities/time-tag/api";
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
  // modals state
  const [isAddTrackerOpen, setIsAddTrackerOpen] = useState<boolean>(false);
  const [isCreateTagModalOpen, setIsCreateTagModalOpen] =
    useState<boolean>(false);

  // inputs state
  const [name, setName] = useState<string>("");
  const [createNewTag, setCreateNewTag] = useState<string>("");

  // data state
  const [isLoadingAllData, setIsLoadingAllData] = useState<boolean>(true);
  const [tags, setTags] = useState<TrackerTag[]>([]);

  useEffect(() => {
    // load all data on first open page
    const loadFirst = async () => {
      const data = await getTags();

      setTags(data);
      setIsLoadingAllData(false);
    };

    loadFirst();
  }, []);

  const handleAddNewTimeTracker = () => {};

  const handleCreateNewTag = async () => {
    const newTagData = {
      name: createNewTag,
      color: "#d946ef",
    };

    const newTag = await createTag(newTagData);

    setTags([...tags, newTag]);
  };

  return (
    <>
      {isLoadingAllData === true && <div>Loading...</div>}

      {isLoadingAllData === false && (
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
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>

                  <label className={field.label}>
                    Тег:
                    <ul>
                      {tags.map((tag, index) => (
                        <li key={index}>{tag.name}</li>
                      ))}
                    </ul>
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

          {isCreateTagModalOpen && (
            <div className={s.CreateTagModal}>
              <label className={field.label}>
                tag:
                <input
                  className={field.input}
                  type="text"
                  value={createNewTag}
                  onChange={(e) => setCreateNewTag(e.target.value)}
                />
              </label>

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
        </main>
      )}
    </>
  );
};
