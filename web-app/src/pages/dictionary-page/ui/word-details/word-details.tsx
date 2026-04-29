import type { Word } from "@shared/api/wordApi";

import s from "./word-details.module.scss";

interface IProps {
  className: string;
  word: Word;
}

export const WordDetails = ({ className, word }: IProps) => {
  return (
    <div className={className}>
      <div className={s.ulContainer}>
        <p>
          Додатков{word.translations.length < 3 ? "ий" : "і"} переклад
          {word.translations.length < 3 ? "" : "и"}:
        </p>
        <ul className={s.ulClass}>
          {word.translations.slice(1).map((t) => (
            <li key={t.id}>{t.text}</li>
          ))}
        </ul>
      </div>
      <div className={s.ulContainer}>
        <p>Пояснення:</p>
        <ul className={s.ulClass}>
          {word.definitions.map((def) => (
            <li key={def.id}>{def.text}</li>
          ))}
        </ul>
      </div>
      <div className={s.ulContainer}>
        <p>Приклад{word.examples.length < 2 ? "" : "и"}:</p>
        <ul className={s.ulClass}>
          {word.examples.map((ex) => (
            <li key={ex.id}>{ex.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
