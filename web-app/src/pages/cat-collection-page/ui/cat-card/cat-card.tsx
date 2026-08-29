import type { Cat } from "../../model/types";
import { useCatCollectionStore } from "../../model/use-cat-collection-store";
import s from "./cat-card.module.scss";

interface CatCardProps {
  cat: Cat;
}

export const CatCard = ({ cat }: CatCardProps) => {
  const { setSelectedCat, setIsDetailsModalOpen } = useCatCollectionStore();

  const handleCardClick = () => {
    setSelectedCat(cat);
    setIsDetailsModalOpen(true);
  };

  const rarityClass = (cat.rarity || "Common").toLowerCase();

  return (
    <article
      className={`${s.cardWrapper} ${s[rarityClass]}`}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCardClick();
        }
      }}
      aria-label={`Котик ${cat.name}, рідкість ${cat.rarity || "Common"}`}
    >
      <div className={s.cardInner}>
        <div className={s.cardHeader}>
          <span className={s.rarityPill}>
            ✨ {cat.rarity || "Common"}
          </span>
          <span className={s.datePill}>
            {new Date(cat.created_at).toLocaleDateString("uk-UA", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>

        <div className={s.imageContainer}>
          <img
            src={cat.image_url}
            alt={cat.name}
            className={s.catPhoto}
            loading="lazy"
          />
        </div>

        <div className={s.cardInfo}>
          <h2 className={s.catTitle}>{cat.name}</h2>
          {cat.breed && <span className={s.breedText}>🏷️ {cat.breed}</span>}

          <div className={s.footerMeta}>
            <span className={s.locationTag}>
              📍 {cat.location_name || `${cat.latitude.toFixed(2)}, ${cat.longitude.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
