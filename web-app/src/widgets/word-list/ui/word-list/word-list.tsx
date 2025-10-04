import { WordCard } from "@/entities/word";

import { WORDS } from "@/shared/lib/constants";

export const WordList = () => {
  return (
    <ul>
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
