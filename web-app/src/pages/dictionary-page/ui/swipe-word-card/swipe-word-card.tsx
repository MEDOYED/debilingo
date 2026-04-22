import { useRef, useState } from "react";

import { useSwipeWordCardStore } from "@pages/dictionary-page/model/use-swipe-word-card";

import type { Word } from "@shared/api/wordApi";

import s from "./swipe-word-card.module.scss";

type SwipeWordCardProps = {
  children: React.ReactNode;
  id: Word["id"];
};

type MoveDirection = "right" | "left";

export const SwipeWordCard = ({ children, id }: SwipeWordCardProps) => {
  const wordCardRef = useRef<HTMLLIElement | null>(null);

  const [firstFingerHorizontalPosition, setFirstFingerHorizontalPosition] =
    useState<number | null>(null);

  const [shiftLength, setShiftLength] = useState<number | null>(null);

  const [moveDirection, setMoveDirection] = useState<MoveDirection | null>(
    null
  );

  const [isOpenLeft, setIsOpenLeft] = useState<boolean>(false);
  const [isOpenRight, setIsOpenRight] = useState<boolean>(false);

  console.log("currentWordId: ", id);

  const { swipedWordId, setSwipedWordId } = useSwipeWordCardStore();

  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipedWordId(id);

    const touch = e.touches[0];

    console.log("Відстань зліва", touch.clientX);
    console.log("Відстань зверху", touch.clientY);

    setFirstFingerHorizontalPosition(touch.clientX);
  };

  console.log("firstFingerHorizontalPosition: ", firstFingerHorizontalPosition);

  const handleFingerMove = (e: React.TouchEvent) => {
    const moveTouch = e.touches[0];

    console.log("Відстань зліва", moveTouch.clientX);
    console.log("Відстань зверху", moveTouch.clientY);

    if (!firstFingerHorizontalPosition) return;

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

    console.log(moveDirection);
  };

  console.log("shiftLength: ", shiftLength);

  const handleTouchEnd = () => {
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
  };

  console.log("isOpenLeft: ", isOpenLeft);

  const isWordSwiped = swipedWordId === id;
  console.log("isWordSwiped: ", isWordSwiped);

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
        <button className={s.attachBtn}>Pin</button>
      </div>

      {children}

      <div className={s.rightActionsBtns}>
        <button className={s.deleteBtn}>D</button>
      </div>
    </li>
  );
};
