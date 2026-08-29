import { useNavigate } from "react-router-dom";
import { useCatCollectionStore } from "../../model/use-cat-collection-store";
import { CatMiniMap } from "../cat-mini-map/cat-mini-map";
import s from "./cat-details-modal.module.scss";

export const CatDetailsModal = () => {
  const navigate = useNavigate();
  const {
    selectedCat,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    removeCat,
  } = useCatCollectionStore();

  if (!isDetailsModalOpen || !selectedCat) return null;

  const rarityClass = (selectedCat.rarity || "Common").toLowerCase();

  const handleDelete = async () => {
    if (window.confirm(`Ви впевнені, що хочете видалити котика "${selectedCat.name}"?`)) {
      await removeCat(selectedCat.id);
    }
  };

  const handleOpenOnMap = () => {
    setIsDetailsModalOpen(false);
    navigate("/cats/map");
  };

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
            className={s.catPhoto}
          />
          <span className={`${s.rarityPill} ${s[rarityClass]}`}>
            ✨ {selectedCat.rarity || "Common"}
          </span>
        </div>

        <div className={s.content}>
          <div className={s.header}>
            <h2 className={s.catName}>{selectedCat.name}</h2>
            {selectedCat.breed && (
              <span className={s.breedTag}>🏷️ {selectedCat.breed}</span>
            )}
          </div>

          <div className={s.infoRow}>
            <span className={s.infoLabel}>🗓️ Спіймано:</span>
            <span className={s.infoValue}>
              {new Date(selectedCat.created_at).toLocaleString("uk-UA", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>

          {selectedCat.location_name && (
            <div className={s.infoRow}>
              <span className={s.infoLabel}>🏙️ Локація:</span>
              <span className={s.infoValue}>{selectedCat.location_name}</span>
            </div>
          )}

          {selectedCat.notes && (
            <div className={s.notesBox}>
              <span className={s.notesTitle}>📝 Нотатки:</span>
              <p className={s.notesContent}>{selectedCat.notes}</p>
            </div>
          )}

          {/* Embedded mini map */}
          <div className={s.miniMapSection}>
            <span className={s.sectionTitle}>📍 Місце зустрічі</span>
            <CatMiniMap
              latitude={selectedCat.latitude}
              longitude={selectedCat.longitude}
            />
          </div>

          <div className={s.actions}>
            <button
              type="button"
              className={s.mapBtn}
              onClick={handleOpenOnMap}
            >
              🗺️ Показати на мапі
            </button>

            <button
              type="button"
              className={s.deleteBtn}
              onClick={handleDelete}
            >
              🗑️ Видалити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
