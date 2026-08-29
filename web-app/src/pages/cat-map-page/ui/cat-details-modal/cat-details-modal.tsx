import { Link } from "react-router-dom";
import { useCatMapStore } from "../../model/use-cat-map-store";
import s from "./cat-details-modal.module.scss";

export const CatDetailsModal = () => {
  const { selectedCat, isDetailsModalOpen, setIsDetailsModalOpen } =
    useCatMapStore();

  if (!isDetailsModalOpen || !selectedCat) return null;

  const rarity = (selectedCat.rarity || "Common").toLowerCase();

  return (
    <div
      className={s.backdrop}
      onClick={() => setIsDetailsModalOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={s.modalCard}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={s.closeBtn}
          onClick={() => setIsDetailsModalOpen(false)}
          aria-label="Закрити"
        >
          ✕
        </button>

        <div className={s.imageWrapper}>
          <img
            src={selectedCat.image_url}
            alt={selectedCat.name}
            className={s.catImage}
          />
          <div className={`${s.rarityPill} ${s[rarity]}`}>
            ✨ {selectedCat.rarity || "Common"}
          </div>
        </div>

        <div className={s.content}>
          <div className={s.header}>
            <h2 className={s.catName}>{selectedCat.name}</h2>
            {selectedCat.breed && (
              <span className={s.breedTag}>🏷️ {selectedCat.breed}</span>
            )}
          </div>

          <div className={s.metaGrid}>
            <div className={s.metaItem}>
              <span className={s.metaLabel}>🗓️ Спіймано:</span>
              <span className={s.metaValue}>
                {new Date(selectedCat.created_at).toLocaleString("uk-UA", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>

            <div className={s.metaItem}>
              <span className={s.metaLabel}>📍 Координати:</span>
              <span className={s.metaValue}>
                {selectedCat.latitude.toFixed(4)}, {selectedCat.longitude.toFixed(4)}
              </span>
            </div>

            {selectedCat.location_name && (
              <div className={s.metaItem}>
                <span className={s.metaLabel}>🏙️ Локація:</span>
                <span className={s.metaValue}>{selectedCat.location_name}</span>
              </div>
            )}
          </div>

          {selectedCat.notes && (
            <div className={s.notesSection}>
              <span className={s.notesLabel}>📝 Нотатки:</span>
              <p className={s.notesText}>{selectedCat.notes}</p>
            </div>
          )}

          <div className={s.actions}>
            <Link
              to="/cats/collection"
              className={s.viewCollectionBtn}
              onClick={() => setIsDetailsModalOpen(false)}
            >
              📚 Відкрити в колекції
            </Link>
            <button
              type="button"
              className={s.dismissBtn}
              onClick={() => setIsDetailsModalOpen(false)}
            >
              Закрити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
