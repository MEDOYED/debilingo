import { Link } from "react-router-dom";
import s from "./cat-empty-banner.module.scss";

export const CatEmptyBanner = () => {
  return (
    <div className={s.banner}>
      <div className={s.iconWrapper}>🐈</div>
      <div className={s.textWrapper}>
        <h2 className={s.title}>Ваша мапа поки що порожня!</h2>
        <p className={s.subtitle}>
          Знайдіть котика на вулиці чи вдома, зробіть фото та додайте на мапу.
        </p>
      </div>
      <Link to="/cats/catch" className={s.catchBtn}>
        📸 Спіймати котика!
      </Link>
    </div>
  );
};
