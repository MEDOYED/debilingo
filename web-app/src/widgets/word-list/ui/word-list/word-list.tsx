import { WordCard } from "@/entities/word";

import { WORDS } from "@/shared/lib/constants";

import s from "./word-list.module.scss";

export const WordList = () => {
  return (
    <ul className={s.list}>
      {WORDS.map((item) => (
        <li>
          <WordCard
            enWord={item.en}
            ukWord={item.uk}
          />
        </li>
      ))}
    </ul>
  );
};
