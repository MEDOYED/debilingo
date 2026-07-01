import { Clock, LabelTag } from "@shared/ui/icons";

import axios from "axios";
import { useEffect, useState } from "react";

import { FilledButton, TextButton } from "@shared/ui/buttons";

import type { TrackerTag } from "@entities/time-tag";
import { createTag, getTags } from "@entities/time-tag/api";
import { cn } from "@shared/lib/styles";
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

  // inputs state
  const [name, setName] = useState<string>("");
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
                    Назва:
                    <input
                      className={field.input}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>

                  <div className={field.label}>
                    Тег:
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
                tag:
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
