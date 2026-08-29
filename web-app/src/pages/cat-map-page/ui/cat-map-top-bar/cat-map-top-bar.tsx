import { Link } from "react-router-dom";
import { useCatMapStore } from "../../model/use-cat-map-store";
import { useGeolocation } from "../../hooks/use-geolocation";
import s from "./cat-map-top-bar.module.scss";

export const CatMapTopBar = () => {
  const { cats, isLoading, loadCats } = useCatMapStore();
  const { requestLocation, isLocating } = useGeolocation();

  return (
    <header className={s.topBar}>
      <div className={s.leftSection}>
        <div className={s.titleWrapper}>
          <span className={s.badgeIcon}>🐾</span>
          <h1 className={s.title}>Catemon Map</h1>
          <span className={s.countBadge}>{cats.length}</span>
        </div>
      </div>

      <div className={s.actions}>
        <button
          type="button"
          className={s.actionBtn}
          onClick={requestLocation}
          disabled={isLocating}
          title="Знайти моє місцезнаходження"
          aria-label="Моє місцезнаходження"
        >
          {isLocating ? "📡..." : "📍 Моє місце"}
        </button>

        <button
          type="button"
          className={s.actionBtn}
          onClick={() => loadCats()}
          disabled={isLoading}
          title="Оновити котів"
          aria-label="Оновити"
        >
          {isLoading ? "⏳" : "🔄"}
        </button>

        <Link
          to="/cats/collection"
          className={s.collectionLink}
        >
          📚 Колекція
        </Link>
      </div>
    </header>
  );
};
