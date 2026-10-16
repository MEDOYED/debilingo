import { useEffect, useState } from "react";

import { useDictionariesStore } from "@entities/dictionary";

import { CustomSelect } from "./ui/custom-select/custom-select";
import { Quiz } from "./ui/quiz/quiz";

import s from "./game-quiz-page.module.scss";

export const GameQuizPage = () => {
  const [startGame, setStartGame] = useState(false);
  const { dictionaries, fetchDictionaries } = useDictionariesStore();
  const [dictionaryId, setDictionaryId] = useState("");

  useEffect(() => {
    fetchDictionaries();
  }, [fetchDictionaries]);

  return (
    <main>
      {startGame ? (
        <Quiz
          setStartGame={setStartGame}
          dictionaryId={dictionaryId}
        />
      ) : (
        <div className={s.container}>
          <div className={s.gameNameAndSelect}>
            <h1 className={s.gameName}>Quiz</h1>

            <CustomSelect
              setDictionaryId={setDictionaryId}
              dictionaries={dictionaries}
            />
          </div>

          <button
            disabled={!dictionaryId}
            className={s.startGameButton}
            onClick={() => setStartGame(true)}
          >
            Start Game
          </button>
        </div>
      )}
    </main>
  );
};
