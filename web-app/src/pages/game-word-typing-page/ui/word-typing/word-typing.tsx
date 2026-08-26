import { useEffect, useState } from "react";
import s from "./word-typing.module.scss";
import { getWords, type Word } from "@entities/word";
import { cn } from "@shared/lib/styles";

import correctSound from "@shared/assets/sounds/correct.wav";
import inCorrectSound from "@shared/assets/sounds/incorrect.wav";
import { useStudyInfoModalStore } from "@widgets/study-info-modal";
import { ProgressBar } from "@pages/game-quiz-page/ui/progress-bar/progress-bar";
import { useProfileStore } from "@entities/profile";
import { WordTypingInput } from "../word-typing-input";

const secondsTimeGame = 120;

export const WordTyping = ({
  dictionaryId,
  setStartGame,
}: {
  dictionaryId: string;
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [answer, setAnswer] = useState<string>("");
  const [incorrectAnswer, setIncorrectAnswer] = useState<boolean>(false);
  const [isStopTimer, setIsStopTimer] = useState(false);

  const correctAudio = new Audio(correctSound);
  const inCorrectAudio = new Audio(inCorrectSound);

  const {
    timeCounter,
    increaseTimeCounter,
    increaseXpCounter,
    xpCounter,
    resetCounters,
  } = useStudyInfoModalStore();
  const { updateStudyActivity } = useProfileStore();

  const currentWordReady = currentWord ? true : false;
  useEffect(() => {
    if (!currentWordReady) return;
    let seconds = 0;

    const interval = setInterval(async () => {
      seconds++;

      increaseTimeCounter(1);

      if (seconds >= secondsTimeGame || isStopTimer) {
        clearInterval(interval);

        const currentXp = useStudyInfoModalStore.getState().xpCounter;
        const currentTime = useStudyInfoModalStore.getState().timeCounter;

        if (currentXp === 0) {
          resetCounters();
          setStartGame(false);
          return;
        }

        try {
          const currectTotalXp = currentXp + secondsTimeGame / 10;
          console.log("currectTotalXp: ", currectTotalXp);

          await updateStudyActivity(currectTotalXp, currentTime);
          resetCounters();
        } catch (error) {
          console.error("Failed to save activity", error);
        }

        setStartGame(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentWordReady, isStopTimer]);

  useEffect(() => {
    const loadWords = async () => {
      if (!dictionaryId) return;

      const data = await getWords(dictionaryId, 50, 0);

      setAllWords(data);

      if (data.length === 0) return;

      const randomIndex = Math.floor(Math.random() * data.length);
      const randomWord = data[randomIndex];

      setCurrentWord(randomWord);
    };

    loadWords();
  }, [dictionaryId]);

  const nextQuestion = () => {
    setAnswerCorrect(false);
    const randomIndex = Math.floor(Math.random() * allWords.length);
    const randomWord = allWords[randomIndex];

    setCurrentWord(randomWord);
    setAnswer(""); //  ?
  };

  const correctAnswer = currentWord?.source_word;

  const handleAnswer = (answer: string) => {
    if (!currentWord) return;

    if (
      answer.toLocaleLowerCase().trim() === correctAnswer?.toLocaleLowerCase()
    ) {
      setAnswerCorrect(true);

      correctAudio.currentTime = 0;
      correctAudio.play();
      console.log("Правильно!");
      increaseXpCounter(3);
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    } else {
      setIncorrectAnswer(true);
      //   setAnswerCorrect(true);
      inCorrectAudio.currentTime = 0;
      inCorrectAudio.play();

      setTimeout(() => {
        setIncorrectAnswer(false);
        nextQuestion();
      }, 2000);
    }
  };

  return currentWord ? (
    <div className={s.container}>
      <div className={s.infoContainer}>
        <ProgressBar progress={(timeCounter / secondsTimeGame) * 100} />

        <div className={s.stopButtonAndXpContainer}>
          <div>{xpCounter} xp</div>
          <div
            className={s.stopButton}
            onClick={() => setIsStopTimer(!isStopTimer)}
          >
            stop
          </div>
        </div>
      </div>

      <div
        className={cn(
          s.card,
          answerCorrect ? s.correctCard : "",
          incorrectAnswer ? s.incorrectCard : ""
        )}
      >
        <p className={s.cardText}>{currentWord?.translations[0].text}</p>
      </div>

      <WordTypingInput
        answer={answer}
        setAnswer={setAnswer}
      />

      <button
        type="button"
        onClick={() => {
          handleAnswer(answer);
          console.log(answer);
          console.log(correctAnswer);
        }}
      >
        check
      </button>
    </div>
  ) : (
    <div>loading...</div>
  );
};
