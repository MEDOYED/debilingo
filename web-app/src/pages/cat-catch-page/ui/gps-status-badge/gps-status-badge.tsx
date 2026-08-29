import { useCatCatchStore } from "../../model/use-cat-catch-store";
import s from "./gps-status-badge.module.scss";

export const GpsStatusBadge = () => {
  const { location } = useCatCatchStore();

  if (location.isFetching) {
    return (
      <div className={`${s.badge} ${s.fetching}`}>
        <span className={s.pulseDot}></span>
        <span>🛰️ Визначаємо GPS...</span>
      </div>
    );
  }

  if (location.lat !== null && location.lng !== null) {
    return (
      <div className={`${s.badge} ${s.success}`}>
        <span className={s.dot}></span>
        <span>
          📍 GPS: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </span>
      </div>
    );
  }

  return (
    <div className={`${s.badge} ${s.warning}`}>
      <span>⚠️ GPS не визначено (буде використано центр)</span>
    </div>
  );
};
