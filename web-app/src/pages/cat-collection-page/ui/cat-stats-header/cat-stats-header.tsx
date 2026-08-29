import { Link } from "react-router-dom";
import { useCatCollectionStore } from "../../model/use-cat-collection-store";
import s from "./cat-stats-header.module.scss";

export const CatStatsHeader = () => {
  const { stats, cats } = useCatCollectionStore();

  const total = stats?.total ?? cats.length;
  const commonCount = stats?.rarityBreakdown?.Common ?? 0;
  const rareCount = stats?.rarityBreakdown?.Rare ?? 0;
  const epicCount = stats?.rarityBreakdown?.Epic ?? 0;
  const legendaryCount = stats?.rarityBreakdown?.Legendary ?? 0;

  return (
    <div className={s.statsWrapper}>
      <div className={s.mainInfo}>
        <div className={s.titleRow}>
          <span className={s.trophyIcon}>🏆</span>
          <div>
            <h1 className={s.pageTitle}>Колекція Catemon</h1>
            <p className={s.subtitle}>
              Ваш персональний зошит спійманих котиків
            </p>
          </div>
        </div>

        <div className={s.actionRow}>
          <Link to="/cats/map" className={s.mapLink}>
            🗺️ На мапу
          </Link>
          <Link to="/cats/catch" className={s.catchLink}>
            📸 + Спіймати кота
          </Link>
        </div>
      </div>

      <div className={s.statsGrid}>
        <div className={`${s.statCard} ${s.totalCard}`}>
          <span className={s.statValue}>{total}</span>
          <span className={s.statLabel}>Всього котів</span>
        </div>

        <div className={`${s.statCard} ${s.commonCard}`}>
          <span className={s.statValue}>{commonCount}</span>
          <span className={s.statLabel}>Common</span>
        </div>

        <div className={`${s.statCard} ${s.rareCard}`}>
          <span className={s.statValue}>{rareCount}</span>
          <span className={s.statLabel}>Rare</span>
        </div>

        <div className={`${s.statCard} ${s.epicCard}`}>
          <span className={s.statValue}>{epicCount}</span>
          <span className={s.statLabel}>Epic</span>
        </div>

        <div className={`${s.statCard} ${s.legendaryCard}`}>
          <span className={s.statValue}>{legendaryCount}</span>
          <span className={s.statLabel}>Legendary</span>
        </div>
      </div>
    </div>
  );
};
