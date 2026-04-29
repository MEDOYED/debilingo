import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getWords } from "@shared/api/wordApi";
import { cn } from "@shared/lib/styles";
import { ChevronDown } from "@shared/ui/icons";

import { useAddWordStore } from "./model/use-add-word-store";
import { useLanguageRowStore } from "./model/use-language-row-store";
import { useSwitchColStore } from "./model/use-switch-col-store";

import { AddWordCardModal } from "./ui/add-word-card/add-word-card";
import { DictionaryTopBar } from "./ui/dictionary-top-bar/dictionary-top-bar";
import { LanguageRow } from "./ui/language-row/language-row";
import { Spoiler } from "./ui/spoiler/spoiler";
import { SwipeWordCard } from "./ui/swipe-word-card/swipe-word-card";
import { WordDetails } from "./ui/word-details/word-details";

import s from "./dictionary-page.module.scss";

type Status = "opening" | "expanded" | "closing" | "unexpanded";

export const DictionaryPage = () => {
  const { dictId } = useParams();
  const [openWordId, setOpenWordId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("unexpanded");

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
      setStatus("unexpanded");
    } else {
      setOpenWordId(id);
      setStatus("opening");
      setTimeout(() => setStatus("expanded"), 500);
    }
  };

  let filteredWithPinData = [];

  for (let i = 0; i < words.length; i++) {
    if (words[i].pinned_at) {
      filteredWithPinData.push(words[i]);
    }
  }

  for (let i = 0; i < words.length; i++) {
    if (words[i].pinned_at === null) {
      filteredWithPinData.push(words[i]);
    }
  }

  return (
    <div>
      {/* <div className="container"> */}
      <main className={cn(s.dictionaryPage)}>
        <DictionaryTopBar />
        <LanguageRow />

        <ul className={s.wordsList}>
          {filteredWithPinData.map((word) => {
            const isCurrent = word.id;
            return (
              <SwipeWordCard
                key={word.id}
                id={word.id}
              >
                <div
                  className={cn(
                    s.wordCard,
                    isCurrent && status ? s[`is-${status}`] : "",
                    word.pinned_at && s.pinned
                  )}
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
                    <WordDetails
                      className={s.description}
                      word={word}
                    />
                  </div>
                </div>
              </SwipeWordCard>
            );
          })}
        </ul>

        <AddWordCardModal />
      </main>
    </div>
  );
};
