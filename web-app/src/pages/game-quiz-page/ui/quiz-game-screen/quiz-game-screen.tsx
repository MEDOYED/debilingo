import { useEffect, useState } from "react";

import { useUpdateStudyActivity } from "@entities/profile";
import { getWords, type Word } from "@entities/word";
import correctSound from "@shared/assets/sounds/correct.wav";
import inCorrectSound from "@shared/assets/sounds/incorrect.wav";
import { useStudySessionStore } from "@entities/study-session";
import type { GameScreen } from "@shared/types";

import { ProgressBar } from "../progress-bar/progress-bar";

import s from "./quiz-game-screen.module.scss";

import { useVoicesStore } from "@shared/stores/use-voices-store";
import { SpeakerWave } from "@shared/ui/icons";

export const QuizGameScreen = ({
  dictionaryId,
  gameDurationInSeconds,
  setScreen,
}: {
  dictionaryId: string;
  gameDurationInSeconds: number;
  setScreen: React.Dispatch<React.SetStateAction<GameScreen>>;
}) => {
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [incorrectAnswer, setIncorrectAnswer] = useState<string | null>(null);
  const [isStopTimer, setIsStopTimer] = useState(false);

  const {
    timeCounter,
    increaseTimeCounter,
    increaseXpCounter,
    decreaseXpCounter,
    xpCounter,
    resetCounters,
  } = useStudySessionStore();

  const { updateStudyActivity } = useUpdateStudyActivity();

  const correctAudio = new Audio(correctSound);
  const inCorrectAudio = new Audio(inCorrectSound);

  const generateAnswers = (words: Word[], currentWord: Word): string[] => {
    const correctAnswer = currentWord.translations[0].text;

    const wrongAnswers = words
      .filter((word) => word.id !== currentWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((word) => word.translations[0].text);

    return [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
  };

  const currentWordReady = currentWord ? true : false;
  useEffect(() => {
    if (!currentWordReady) return;
    let seconds = 0;

    const interval = setInterval(async () => {
      seconds++;

      increaseTimeCounter(1);

      if (seconds >= gameDurationInSeconds || isStopTimer) {
        clearInterval(interval);

        const currentXp = useStudySessionStore.getState().xpCounter;
        const currentTime = useStudySessionStore.getState().timeCounter;

        if (currentXp === 0) {
          resetCounters();
          setScreen("setup");
          return;
        }

        try {
          const currectTotalXp = currentXp + Math.trunc(currentTime / 10);
          console.log("currectTotalXp: ", currectTotalXp);

          await updateStudyActivity({
            xpDelta: currectTotalXp,
            timeDelta: currentTime,
          });

          resetCounters();
        } catch (error) {
          console.error("Failed to save activity", error);
        }
        setScreen("setup");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentWordReady, isStopTimer]);

  useEffect(() => {
    const loadWords = async () => {
      if (!dictionaryId) return;

      console.log("dictionaryId:", dictionaryId);

      const data = await getWords(dictionaryId, 50, 0);

      setAllWords(data);

      console.log("words get successfullty");

      if (data.length === 0) return;

      const randomIndex = Math.floor(Math.random() * data.length);
      const randomWord = data[randomIndex];

      setCurrentWord(randomWord);
      setAnswers(generateAnswers(data, randomWord));
    };

    loadWords();
  }, [dictionaryId]);

  const nextQuestion = () => {
    setAnswerCorrect(false);
    const randomIndex = Math.floor(Math.random() * allWords.length);
    const randomWord = allWords[randomIndex];

    setCurrentWord(randomWord);
    setAnswers(generateAnswers(allWords, randomWord));
  };

  const correctAnswer = currentWord?.translations[0].text;

  const { voices } = useVoicesStore();

  const speak = (text: string, lang: string = "en-US") => {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = lang;
    utterance.rate = 1;
    utterance.pitch = 1;

    const samanthaVoice = voices.find((voice) => {
      const splitedVoiceURI = voice.voiceURI.split(".");
      const splitedVoiceURILength = splitedVoiceURI.length;
      const voiceName = splitedVoiceURI[splitedVoiceURILength - 1];
      const searchedVoice = voiceName === "Samantha";

      return searchedVoice;
    });
    if (samanthaVoice) utterance.voice = samanthaVoice;

    speechSynthesis.speak(utterance);
  };

  const handleAnswer = (answer: string) => {
    if (!currentWord) return;

    if (answer === correctAnswer) {
      setAnswerCorrect(true);

      correctAudio.currentTime = 0;
      correctAudio.play();
      console.log("Правильно!");
      increaseXpCounter(1);
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    } else {
      decreaseXpCounter(1);
      setIncorrectAnswer(answer);
      setAnswerCorrect(true);
      inCorrectAudio.currentTime = 0;
      inCorrectAudio.play();

      setTimeout(() => {
        setIncorrectAnswer(null);
        nextQuestion();
      }, 2000);
    }
  };

  return currentWord ? (
    <div className={s.container}>
      <div className={s.infoContainer}>
        <ProgressBar progress={(timeCounter / gameDurationInSeconds) * 100} />

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
        className={`${s.card} ${answerCorrect ? s.correctCard : ""} ${incorrectAnswer ? s.incorrectCard : ""}`}
      >
        <p className={s.cardText}>{currentWord.source_word}</p>
        <button
          type="button"
          className={s.speaker}
          onClick={() => speak(currentWord.source_word)}
        >
          <SpeakerWave />
        </button>
      </div>

      <div className={s.buttonsContainer}>
        {answers.map((answer, index) => (
          <button
            disabled={answerCorrect}
            key={index}
            className={`${s.answers} ${answerCorrect && answer === correctAnswer ? s.correct : ""}
               ${incorrectAnswer === answer ? `${s.incorrect}` : ""}`}
            onClick={() => handleAnswer(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
};
