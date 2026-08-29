import { Link } from "react-router-dom";
import s from "./empty-collection.module.scss";

interface EmptyCollectionProps {
  isFiltered?: boolean;
}

export const EmptyCollection = ({ isFiltered = false }: EmptyCollectionProps) => {
  return (
    <div className={s.emptyWrapper}>
      <div className={s.catIcon}>🐈‍⬛</div>
      <h2 className={s.title}>
        {isFiltered ? "Нічого не знайдено" : "Ваша колекція поки що порожня!"}
      </h2>
      <p className={s.subtitle}>
        {isFiltered
          ? "Спробуйте змінити пошуковий запит або скинути фільтри рідкості."
          : "Ви ще не спіймали жодного котика. Час вирушати на фото-полювання!"}
      </p>

      {!isFiltered && (
        <Link to="/cats/catch" className={s.catchBtn}>
          📸 Спіймати першого котика!
        </Link>
      )}
    </div>
  );
};
