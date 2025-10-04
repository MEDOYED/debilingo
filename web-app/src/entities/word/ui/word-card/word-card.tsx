import s from "./word-card.module.scss";

interface WordCardProps {
  enWord: string;
  ukWord: string;
}

export const WordCard = ({ enWord, ukWord }: WordCardProps) => {
  return (
    <article className={s.card}>
      <div className={s.word}>
        <div className={s.ukrainianWord}>{ukWord}</div>
        <div className={s.englishWord}>{enWord}</div>
      </div>
    </article>
  );
};
