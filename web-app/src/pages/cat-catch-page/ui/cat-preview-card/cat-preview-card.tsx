import { useCatCatchStore } from "../../model/use-cat-catch-store";
import s from "./cat-preview-card.module.scss";

export const CatPreviewCard = () => {
  const { photoUrl, name, rarity, breed, locationName, location } =
    useCatCatchStore();

  if (!photoUrl) return null;

  const rarityClass = rarity.toLowerCase();

  return (
    <div className={`${s.cardWrapper} ${s[rarityClass]}`}>
      <div className={s.holographicGlow}></div>

      <div className={s.cardInner}>
        <div className={s.cardHeader}>
          <span className={s.catBadge}>🐾 CATEMON</span>
          <span className={`${s.rarityBadge} ${s[rarityClass]}`}>
            ✨ {rarity}
          </span>
        </div>

        <div className={s.imageContainer}>
          <img
            src={photoUrl}
            alt={name || "Спійманий кіт"}
            className={s.catPhoto}
          />
        </div>

        <div className={s.cardInfo}>
          <h3 className={s.catTitle}>{name || "Безіменний кіт"}</h3>
          {breed && <span className={s.breedSubtitle}>🏷️ {breed}</span>}

          <div className={s.locationChip}>
            📍 {locationName || (location.lat ? `${location.lat.toFixed(4)}, ${location.lng?.toFixed(4)}` : "Локація визначена")}
          </div>
        </div>
      </div>
    </div>
  );
};
