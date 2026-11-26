import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useStudySessionStore } from "@entities/study-session";
import { useAddWordStore, useWordStore } from "@entities/word";
import { getWords } from "@entities/word/api";
import { cn } from "@shared/lib/styles";
import { StudyInfoModal } from "@widgets/study-info-modal";

import { useLanguageRowStore } from "../model/use-language-row-store";
import { useSearchStore } from "../model/use-search-store";
import { useSwitchColStore } from "../model/use-switch-col-store";

import { CreateWordModal } from "./create-word-modal/create-word-modal";
import { DictionaryTopBar } from "./dictionary-top-bar/dictionary-top-bar";
import { LanguageRow } from "./language-row/language-row";
import { Spoiler } from "./spoiler/spoiler";
import { SwipeWordCard } from "./swipe-word-card/swipe-word-card";
import { WordDetails } from "./word-details/word-details";

import { SubmitEditWordButton } from "@features/edit-word";
import { EditableMainTranslationInput } from "@features/edit-word/ui/editable-main-translation-input/editable-main-translation-input";
import { EditableSourceWordInput } from "@features/edit-word/ui/editable-source-word-input/editable-source-word-input";
import { useShuffleStore } from "@features/shuffle-words";
import { useUnshuffleStore } from "@features/unshuffle-words";
import { ChevronDown } from "@shared/ui/icons";

import s from "./dictionary-page.module.scss";

const LOAD_WORDS = 20;

export const DictionaryPage = () => {
  const { dictId } = useParams();

  const { isMainLanguageColVisible, isTranslationColVisible } =
    useLanguageRowStore();
  const { setWords, words, appendWords } = useAddWordStore();
  const { isReversed } = useSwitchColStore();
  const { searchInputValue } = useSearchStore();

  const { xpCounter } = useStudySessionStore();

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const isFetchingMoreRef = useRef(false);

  const {
    openWordId,
    setOpenWordId,
    status,
    setStatus,
    editableWordId,
    setEditableWordId,
  } = useWordStore();

  const { shuffleVersion, isShuffled } = useShuffleStore();
  const { unshuffleVersion } = useUnshuffleStore();

  useEffect(() => {
    let isCancelled = false;

    const loadWords = async () => {
      if (!dictId) return;

      setOffset(0);
      setHasMore(true);
      setWords([]);

      const sort = isShuffled ? "shuffle" : undefined;

      const data = await getWords(
        dictId,
        LOAD_WORDS,
        0,
        sort,
        searchInputValue
      );

      if (!isCancelled) {
        setWords(data);
        setHasMore(data.length >= LOAD_WORDS);
        setOffset(data.length);
      }
    };

    loadWords();

    return () => {
      isCancelled = true;
    };
  }, [shuffleVersion, unshuffleVersion, dictId, isShuffled, searchInputValue]);

  //scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const distanceToBottom =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);

      if (distanceToBottom < 500 && hasMore && !isFetchingMoreRef.current) {
        loadMoreWords();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, offset, dictId, isShuffled, searchInputValue]);

  const loadMoreWords = async () => {
    if (!dictId || !hasMore || isFetchingMoreRef.current) return;
    isFetchingMoreRef.current = true;

    const sort = isShuffled ? "shuffle" : undefined;
    const data = await getWords(
      dictId,
      LOAD_WORDS,
      offset,
      sort,
      searchInputValue
    );
    appendWords(data);
    setHasMore(data.length >= LOAD_WORDS);
    setOffset((prev) => prev + data.length);
    isFetchingMoreRef.current = false;
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
      <main className={s.dictionaryPage}>
        <DictionaryTopBar />
        <LanguageRow />

        <ul className={s.wordsList}>
          {words.map((word) => {
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
                    {/*  */}
                    {editableWordId === word.id ? (
                      <EditableSourceWordInput />
                    ) : (
                      <Spoiler
                        className={s.mainCol}
                        isVisible={isMainLanguageColVisible}
                        word={word.source_word}
                        mainCol={true}
                      >
                        <div className={s.wordAndSpeakerWrapper}>
                          <span className={s.wordSource}>
                            {word.source_word}{" "}
                          </span>
                        </div>
                      </Spoiler>
                    )}

                    {editableWordId === word.id ? (
                      <SubmitEditWordButton />
                    ) : (
                      <ChevronDown
                        className={cn(
                          s.openDescription,
                          openWordId === word.id && s.rotated
                        )}
                        onClick={() => {
                          toggleWord(word.id);
                          setEditableWordId(null);
                        }}
                      />
                    )}

                    {editableWordId === word.id ? (
                      <EditableMainTranslationInput />
                    ) : (
                      <Spoiler
                        mainCol={false}
                        isVisible={isTranslationColVisible}
                      >
                        {word.translations[0]?.text}
                      </Spoiler>
                    )}
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

        <CreateWordModal />

        {xpCounter > 0 && <StudyInfoModal />}
      </main>
    </div>
  );
};
