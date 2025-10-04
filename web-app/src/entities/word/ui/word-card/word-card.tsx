import s from "./word-card.module.scss";

export const WordCard = ({ enWord, ukWord }) => {
  return (
    <article>
      <div>
        <input className={s.englishWord}>{enWord}</input>
        <input className={s.ukrainianWord}>ukWord</input>
      </div>
    </article>
  );
};
