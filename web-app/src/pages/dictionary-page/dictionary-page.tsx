import { getWords } from "@shared/api/wordApi";
import { cn } from "@shared/lib/styles";

// import { useEffect } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAddWordStore } from "./model/use-add-word-store";
import { AddWordCardModal } from "./ui/add-word-card/add-word-card";
import { DictionaryTopBar } from "./ui/dictionary-top-bar/dictionary-top-bar";
import { Spoiler } from "./ui/spoiler/spoiler";

import s from "./dictionary-page.module.scss";
import { LanguageRow } from "./ui/language-row/language-row";

export const DictionaryPage = () => {
  const { dictId } = useParams();

  const { setWords, words } = useAddWordStore();

  useEffect(() => {
    const loadWords = async () => {
      if (!dictId) return;
      const data = await getWords(dictId);
      setWords(data);
    };

    loadWords();
  }, [dictId]);

  return (
    <div className="container">
      <main className={cn(s.dictionaryPage)}>
        <DictionaryTopBar />

        <LanguageRow />

        <ul className={s.wordsList}>
          {words.map((word) => (
            <li
              className={s.wordCard}
              key={word.id}
            >
              <Spoiler>{word.source_word}</Spoiler>

              <span>{word.translations[0]?.text}</span>
            </li>
          ))}
        </ul>

        <AddWordCardModal />
      </main>
    </div>
  );
};
