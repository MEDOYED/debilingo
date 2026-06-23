import s from "./update-description-modal.module.scss";

import { TextButton } from "@shared/ui/buttons";

import { useEffect } from "react";
import { useUpdateDescriptionModalStore } from "../../model/use-update-description-modal-store";

export const UpdateDescriptionModal = () => {
  const { closeUpdateDescriptionModal, isUpdateDescriptionModalOpen } =
    useUpdateDescriptionModalStore();

  // if (isUpdateDescriptionModalOpen === false) return;

  console.log("isUpdateDescriptionModalOpen", isUpdateDescriptionModalOpen);

  useEffect(() => {
    if (isUpdateDescriptionModalOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [isUpdateDescriptionModalOpen]);

  return (
    <>
      {isUpdateDescriptionModalOpen && (
        <div
          className={s.backdrop}
          onClick={() => closeUpdateDescriptionModal()}
        >
          <div
            className={s.modal}
            onClick={(e) => e.stopPropagation()}
          >
            {/* top row */}
            <div>
              <div>
                <h2 className={s.version}>v 0.2 </h2>
                <span className={s.date}>24.06.2026</span>
              </div>

              <TextButton
                as="button"
                onClick={() => closeUpdateDescriptionModal()}
                className={s.closeButton}
              >
                X
              </TextButton>
            </div>

            {/* update info */}
            <div>
              <h3 className={s.title}>Features:</h3>
              <ul className={s.list}>
                <li>- Modal window with update versions descriptions</li>
                <li>- The ability to edit words</li>
              </ul>

              <h3 className={s.title}>Improvments:</h3>
              <ul className={s.list}>
                <li>- loading speed of the words</li>
              </ul>

              <h3 className={s.title}>Fixes:</h3>
              <ul className={s.list}>
                <li>
                  - Fixed appearance the annoying left/right action buttons when
                  scrolling vertically through the dictionary.
                </li>
                <li>
                  - Fixed an issue where words from the previous dictionary
                  remained visible while new words were loading during a
                  dictionary switch.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
