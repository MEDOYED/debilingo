import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getWords } from "@shared/api/wordApi";
import { cn } from "@shared/lib/styles";

import { useAddWordStore } from "./model/use-add-word-store";
import { useLanguageRowStore } from "./model/use-language-row-store";
import { useSwitchColStore } from "./model/use-switch-col-store";

import { AddWordCardModal } from "./ui/add-word-card/add-word-card";
import { DictionaryTopBar } from "./ui/dictionary-top-bar/dictionary-top-bar";
import { Spoiler } from "./ui/spoiler/spoiler";
import { LanguageRow } from "./ui/language-row/language-row";

import s from "./dictionary-page.module.scss";

export const DictionaryPage = () => {
  const { dictId } = useParams();
  const { isMainLanguageColVisible, isTranslationColVisible } =
    useLanguageRowStore();

  const { setWords, words } = useAddWordStore();

  const { isReversed } = useSwitchColStore();

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
              className={cn(s.wordCard, isReversed && s.reverseRow)}
              key={word.id}
            >
              <Spoiler
                className={s.mainCol}
                isVisible={isMainLanguageColVisible}
              >
                {word.source_word}
              </Spoiler>

              <Spoiler isVisible={isTranslationColVisible}>
                {word.translations[0]?.text}
              </Spoiler>
            </li>
          ))}
        </ul>

        <AddWordCardModal />
      </main>
    </div>
  );
};
