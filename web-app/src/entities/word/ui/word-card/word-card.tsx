import s from "./word-card.module.scss";

interface WordCardProps {
  enWord: string;
  ukWord: string;
}

export const WordCard = ({ enWord, ukWord }: WordCardProps) => {
  return (
    <article>
      <div>
        <div className={s.englishWord}>{enWord}</div>
        <div className={s.ukrainianWord}>{ukWord}</div>
      </div>
    </article>
  );
};
