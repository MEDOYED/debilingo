import { useRef, useState } from "react";

import type { Word } from "@entities/word";
import { useSwipeWordStore } from "@entities/word";
import { deleteWord, pinWord, unpinWord } from "@entities/word/api";

import { EditButton } from "@features/edit-word";

import { Pin, Trash, Unpin } from "@shared/ui/icons";

import { useAddWordStore } from "../../../../entities/word/model/use-add-word-store";
import { useWordStore } from "../../../../entities/word/model/use-word-store";

import s from "./swipe-word-card.module.scss";

type SwipeWordCardProps = {
  children: React.ReactNode;
  id: Word["id"];
  wordPinnedAt: Word["pinned_at"];
};

type MoveDirectionX = "right" | "left";

export const SwipeWordCard = ({
  children,
  id,
  wordPinnedAt,
}: SwipeWordCardProps) => {
  const wordCardRef = useRef<HTMLLIElement | null>(null);

  const [firstFingerHorizontalPosition, setFirstFingerHorizontalPosition] =
    useState<number | null>(null);
  const [firstFingerVerticalPosition, setFirstFingerVerticalPosition] =
    useState<number | null>(null);

  const { shiftX, setShiftX } = useSwipeWordStore();

  const [moveDirectionX, setMoveDirectionX] = useState<MoveDirectionX | null>(
    null
  );
  const [isMoveDirectionY, setIsMoveDirectionY] = useState<boolean>(false);

  const [isOpenLeft, setIsOpenLeft] = useState<boolean>(false);
  const [isOpenRight, setIsOpenRight] = useState<boolean>(false);

  const [moveDistanceX, setMoveDistanceX] = useState<number>(0);

  // console.log("currentWordId: ", id);

  const { swipedWordId, setSwipedWordId } = useWordStore();

  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipedWordId(id);

    const touch = e.touches[0];

    // console.log("Відстань зліва", touch.clientX);

    setFirstFingerHorizontalPosition(touch.clientX);
    setFirstFingerVerticalPosition(touch.clientY);
  };

  // console.log("firstFingerHorizontalPosition: ", firstFingerHorizontalPosition);

  const handleFingerMove = (e: React.TouchEvent) => {
    const moveTouch = e.touches[0];

    // console.log("Відстань зліва", moveTouch.clientX);

    if (!firstFingerHorizontalPosition) return;
    if (!firstFingerVerticalPosition) return;

    setMoveDistanceX(
      Math.abs(firstFingerHorizontalPosition - moveTouch.clientX)
    );

    if (Math.abs(firstFingerVerticalPosition - moveTouch.clientY) > 10) {
      setIsMoveDirectionY(true);
    }

    if (moveDistanceX < 15) return;

    const currentShiftLength = Math.floor(
      firstFingerHorizontalPosition - moveTouch.clientX
    );

    if (isMoveDirectionY === true) return;

    if (firstFingerHorizontalPosition - moveTouch.clientX > 0) {
      setMoveDirectionX("left");
      setShiftX(-currentShiftLength);
    } else {
      setMoveDirectionX("right");
      setShiftX(-currentShiftLength);
    }

    // console.log(moveDirection);
  };

  // console.log("shiftLength: ", shiftLength);

  const handleTouchEnd = () => {
    if (moveDistanceX < 15) {
      setMoveDistanceX(0);
      return;
    }

    if (moveDirectionX === "left" && isOpenLeft && !isMoveDirectionY) {
      setShiftX(0);
      setIsOpenLeft(false);
    } else if (moveDirectionX === "right" && isOpenRight && !isMoveDirectionY) {
      setShiftX(0);
      setIsOpenRight(false);
    } else if (moveDirectionX === "left" && !isMoveDirectionY) {
      setShiftX(-50);
      setIsOpenRight(true);
    } else if (moveDirectionX === "right" && !isMoveDirectionY) {
      setIsOpenLeft(true);
      setShiftX(100);
    } else if (isMoveDirectionY) {
      setIsOpenLeft(false);
      setIsOpenRight(false);
      setShiftX(0);
    }

    setIsMoveDirectionY(false);
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

    setShiftX(0);
  };

  const handleUnpinWord = async () => {
    const unpinnedWord = await unpinWord(id);

    const wordsWithoutCurrent = words.filter((word) => word.id !== id);

    setWords([unpinnedWord, ...wordsWithoutCurrent]);

    setShiftX(0);
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
          ? { transform: `translateX(${shiftX}px)` }
          : { transform: `translateX(0px)` }
      }
    >
      <div className={s.leftActionsBtns}>
        <button
          className={s.leftActionBtn}
          onClick={
            wordPinnedAt === null
              ? () => handlePinWord()
              : () => handleUnpinWord()
          }
        >
          {wordPinnedAt === null ? <Pin /> : <Unpin />}
        </button>

        <EditButton
          className={s.leftActionBtn}
          id={id}
        />
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
