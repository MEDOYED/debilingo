import { useEffect, useState } from "react";

import { useProfileStore } from "@entities/profile";
import { getWords, type Word } from "@entities/word";
import correctSound from "@shared/assets/sounds/correct.wav";
import inCorrectSound from "@shared/assets/sounds/incorrect.wav";
import { useStudyInfoModalStore } from "@widgets/study-info-modal";

import { ProgressBar } from "../progress-bar/progress-bar";

import s from "./quiz.module.scss";
import { useVoicesStore } from "@shared/stores/use-voices-store";
import { SpeakerWave } from "@shared/ui/icons";

const secondsTimeGame = 120;

export const Quiz = ({
  dictionaryId,
  setStartGame,
}: {
  dictionaryId: string;
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
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
  } = useStudyInfoModalStore();
  const { updateStudyActivity } = useProfileStore();

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
