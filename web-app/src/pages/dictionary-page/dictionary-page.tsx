import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { cn } from "@shared/lib/styles";
import { getWords } from "@shared/api/wordApi";
import { ChevronDown } from "@shared/ui/icons/chevron-down/chevron-down";

import { useAddWordStore } from "./model/use-add-word-store";
import { useLanguageRowStore } from "./model/use-language-row-store";
import { useSwitchColStore } from "./model/use-switch-col-store";

import { AddWordCardModal } from "./ui/add-word-card/add-word-card";
import { DictionaryTopBar } from "./ui/dictionary-top-bar/dictionary-top-bar";
import { Spoiler } from "./ui/spoiler/spoiler";
import { LanguageRow } from "./ui/language-row/language-row";

import s from "./dictionary-page.module.scss";

type Status = "opening" | "open" | "closing" | null;

export const DictionaryPage = () => {
  const { dictId } = useParams();
  const [openWordId, setOpenWordId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>(null);

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

  const toggleWord = (id: string) => {
    if (openWordId === id) {
      setStatus("closing");
      setOpenWordId(null);
      setStatus(null);
    } else {
      setOpenWordId(id);
      setStatus("opening");
      setTimeout(() => setStatus("open"), 500);
    }
  };

  return (
    <div className="container">
      <main className={cn(s.dictionaryPage)}>
        <DictionaryTopBar />
        <LanguageRow />

        <ul className={s.wordsList}>
          {words.map((word) => {
            const isCurrent = word.id;
            return (
              <li
                className={cn(
                  s.wordCard,
                  isCurrent && status ? s[`is-${status}`] : ""
                )}
                key={word.id}
              >
                <div className={cn(s.row, isReversed && s.reverseRow)}>
                  <Spoiler
                    className={s.mainCol}
                    isVisible={isMainLanguageColVisible}
                  >
                    {word.source_word}
                  </Spoiler>
                  <ChevronDown
                    className={cn(
                      s.openDescription,
                      openWordId === word.id && s.rotated
                    )}
                    onClick={() => toggleWord(word.id)}
                  />
                  <Spoiler isVisible={isTranslationColVisible}>
                    {word.translations[0]?.text}
                  </Spoiler>
                </div>
                <div className={cn(openWordId === word.id && s.open)}>
                  <div className={s.description}>
                    <div>
                      Пояснення: {word.definitions.map((def) => def.text)}
                    </div>
                    <div>Приклад: {word.examples.map((ex) => ex.text)}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <AddWordCardModal />
      </main>
    </div>
  );
};
