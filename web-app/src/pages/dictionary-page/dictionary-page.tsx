import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { getWords } from "@shared/api/wordApi";
import { cn } from "@shared/lib/styles";
import { ChevronDown } from "@shared/ui/icons";
import {
  StudyInfoModal,
  useStudyInfoModalStore,
} from "@widgets/study-info-modal";

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

const LOAD_WORDS = 20;

export const DictionaryPage = () => {
  const { dictId } = useParams();
  const [openWordId, setOpenWordId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("unexpanded");

  const { isMainLanguageColVisible, isTranslationColVisible } =
    useLanguageRowStore();
  const { setWords, words, appendWords } = useAddWordStore();
  const { isReversed } = useSwitchColStore();

  const { xpCounter } = useStudyInfoModalStore();

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const isLoadingRef = useRef(false);

  // initial load when dictId changes
  useEffect(() => {
    setOffset(0);
    setHasMore(true);
    setWords([]);

    const loadFirst = async () => {
      if (!dictId) return;
      setIsLoading(true);
      const data = await getWords(dictId, LOAD_WORDS, 0);
      setWords(data);
      setHasMore(data.length >= LOAD_WORDS);
      setOffset(data.length);
      setIsLoading(false);
    };

    loadFirst();
  }, [dictId]);

  //scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const distanceToBottom =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);

      if (distanceToBottom < 500 && hasMore && !isLoadingRef.current) {
        loadMoreWords();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, offset, dictId]);

  const loadMoreWords = async () => {
    if (!dictId || !hasMore || isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    const data = await getWords(dictId, LOAD_WORDS, offset);
    appendWords(data);
    setHasMore(data.length >= LOAD_WORDS);
    setOffset((prev) => prev + data.length);
    isLoadingRef.current = false;
    setIsLoading(false);
  };

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

  return (
    <div>
      {/* <div className="container"> */}
      <main className={cn(s.dictionaryPage)}>
        <DictionaryTopBar />
        <LanguageRow />

        <ul className={s.wordsList}>
          {words.map((word) => {
            // {filteredWithPinData.map((word) => {
            const isCurrent = word.id;
            return (
              <SwipeWordCard
                key={word.id}
                id={word.id}
                wordPinnedAt={word.pinned_at}
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

        {xpCounter > 0 && <StudyInfoModal />}
      </main>
    </div>
  );
};
