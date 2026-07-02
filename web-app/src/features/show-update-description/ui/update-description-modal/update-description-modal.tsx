import s from "./update-description-modal.module.scss";

import { Fragment } from "react";

import { useEffect } from "react";
import { useUpdateDescriptionModalStore } from "../../model/use-update-description-modal-store";

import { TextButton } from "@shared/ui/buttons";
import { UPDATES_DATA } from "../../config/updates-data";

export const UpdateDescriptionModal = () => {
  const { closeUpdateDescriptionModal, isUpdateDescriptionModalOpen } =
    useUpdateDescriptionModalStore();

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
            <>
              {UPDATES_DATA.map((item, index) => (
                <Fragment key={index}>
                  {/* top row */}
                  <div>
                    <div>
                      <h2 className={s.version}>v {item.version} </h2>
                      <span className={s.date}>{item.date}</span>
                      <div className={s.date}>
                        This update took {item.manHours} man-hours.
                      </div>
                    </div>

                    <TextButton
                      as="button"
                      onClick={() => closeUpdateDescriptionModal()}
                      className={s.closeButton}
                    >
                      ⛌
                    </TextButton>
                  </div>

                  {/* update info */}
                  <div className={s.updateInfoWrapper}>
                    {item.features && (
                      <>
                        <h3 className={s.title}>Features:</h3>
                        <ul className={s.list}>
                          {item.features.map((feature, index) => (
                            <li key={index}>- {feature}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {item.improvements && (
                      <>
                        <h3 className={s.title}>Improvements:</h3>
                        <ul className={s.list}>
                          {item.improvements.map((improvement, index) => (
                            <li key={index}>- {improvement}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {item.fixes && (
                      <>
                        <h3 className={s.title}>Fixes:</h3>
                        <ul className={s.list}>
                          {item.fixes.map((fix, index) => (
                            <li key={index}>- {fix}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    <h2 className={s.contributorTitle}>
                      All the contributors who made this release possible!
                    </h2>
                    <ul>
                      {item.contributors.map((contributor, index) => (
                        <li key={index}>{contributor}</li>
                      ))}
                    </ul>
                  </div>
                </Fragment>
              ))}
            </>
          </div>
        </div>
      )}
    </>
  );
};
