import { useRef, useState } from "react";

import { deleteWord, pinWord, unpinWord, type Word } from "@shared/api/wordApi";
import { Pin, Trash, Unpin } from "@shared/ui/icons";

import { useAddWordStore } from "../../model/use-add-word-store";
import { useSwipeWordCardStore } from "../../model/use-swipe-word-card";

import s from "./swipe-word-card.module.scss";

type SwipeWordCardProps = {
  children: React.ReactNode;
  id: Word["id"];
  wordPinnedAt: Word["pinned_at"];
};

type MoveDirection = "right" | "left";

export const SwipeWordCard = ({
  children,
  id,
  wordPinnedAt,
}: SwipeWordCardProps) => {
  const wordCardRef = useRef<HTMLLIElement | null>(null);

  const [firstFingerHorizontalPosition, setFirstFingerHorizontalPosition] =
    useState<number | null>(null);

  const [shiftLength, setShiftLength] = useState<number | null>(null);

  const [moveDirection, setMoveDirection] = useState<MoveDirection | null>(
    null
  );

  const [isOpenLeft, setIsOpenLeft] = useState<boolean>(false);
  const [isOpenRight, setIsOpenRight] = useState<boolean>(false);

  const [moveDistanceX, setMoveDistanceX] = useState<number>(0);

  // console.log("currentWordId: ", id);

  const { swipedWordId, setSwipedWordId } = useSwipeWordCardStore();

  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipedWordId(id);

    const touch = e.touches[0];

    // console.log("Відстань зліва", touch.clientX);

    setFirstFingerHorizontalPosition(touch.clientX);
  };

  // console.log("firstFingerHorizontalPosition: ", firstFingerHorizontalPosition);

  const handleFingerMove = (e: React.TouchEvent) => {
    const moveTouch = e.touches[0];

    // console.log("Відстань зліва", moveTouch.clientX);

    if (!firstFingerHorizontalPosition) return;

    setMoveDistanceX(
      Math.abs(firstFingerHorizontalPosition - moveTouch.clientX)
    );

    if (moveDistanceX < 15) return;

    const currentShiftLength = Math.floor(
      firstFingerHorizontalPosition - moveTouch.clientX
    );

    if (firstFingerHorizontalPosition - moveTouch.clientX > 0) {
      setMoveDirection("left");
      setShiftLength(-currentShiftLength);
    } else {
      setMoveDirection("right");
      setShiftLength(-currentShiftLength);
    }

    // console.log(moveDirection);
  };

  // console.log("shiftLength: ", shiftLength);

  const handleTouchEnd = () => {
    if (moveDistanceX < 15) {
      setMoveDistanceX(0);
      return;
    }

    if (moveDirection === "left" && isOpenLeft) {
      setShiftLength(0);
      setIsOpenLeft(false);
    } else if (moveDirection === "right" && isOpenRight) {
      setShiftLength(0);
      setIsOpenRight(false);
    } else if (moveDirection === "left") {
      setShiftLength(-50);
      setIsOpenRight(true);
    } else if (moveDirection === "right") {
      setIsOpenLeft(true);
      setShiftLength(50);
    }

    setMoveDistanceX(0);
  };

  // console.log("isOpenLeft: ", isOpenLeft);

  const isWordSwiped = swipedWordId === id;
  // console.log("isWordSwiped: ", isWordSwiped);

  const { setWords, words } = useAddWordStore();

  const handlePinWord = async () => {
    const pinnedWord = await pinWord(id);

    const wordsWithoutPinnedWord = [];

    for (let i = 0; i < words.length; i++) {
      if (words[i].id !== id) {
        wordsWithoutPinnedWord.push(words[i]);
      }
    }

    setWords([pinnedWord, ...wordsWithoutPinnedWord]);

    setShiftLength(0);
  };

  const handleUnpinWord = async () => {
    const unpinnedWord = await unpinWord(id);

    const wordsWithoutCurrent = words.filter((word) => word.id !== id);

    setWords([unpinnedWord, ...wordsWithoutCurrent]);

    setShiftLength(0);
  };

  const handleDeleteWord = async () => {
    await deleteWord(id);

    const wordsWithoutDeletedWord = [];

    for (let i = 0; i < words.length; i++) {
      if (words[i].id !== id) {
        wordsWithoutDeletedWord.push(words[i]);
      }
    }

    setWords(wordsWithoutDeletedWord);
  };

  return (
    <li
      ref={wordCardRef}
      className={s.wordCard}
      onTouchStart={handleTouchStart}
      onTouchMove={handleFingerMove}
      onTouchEnd={handleTouchEnd}
      style={
        isWordSwiped
          ? { transform: `translateX(${shiftLength}px)` }
          : { transform: `translateX(0px)` }
      }
    >
      <div className={s.leftActionsBtns}>
        <button
          className={s.attachBtn}
          onClick={
            wordPinnedAt === null
              ? () => handlePinWord()
              : () => handleUnpinWord()
          }
        >
          {wordPinnedAt === null ? <Pin /> : <Unpin />}
        </button>
      </div>

      {children}

      <div className={s.rightActionsBtns}>
        <button
          className={s.deleteBtn}
          onClick={handleDeleteWord}
        >
          <Trash />
        </button>
      </div>
    </li>
  );
};
