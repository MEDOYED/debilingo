import { useEffect, useState } from "react";

import { useDictionariesStore } from "@widgets/dictionaries-list-section/model/use-dictionaries-store";
import { getDictionaries } from "@shared/api/dictionaryApi";

import { Quiz } from "./ui/quiz";
import { CustomSelect } from "./ui/custom-select/custom-select";

import s from "./game-quiz-page.module.scss";

export const GameQuizPage = () => {
  const [startGame, setStartGame] = useState(false);
  const { dictionaries, setDictionaries } = useDictionariesStore();
  const [dictionaryId, setDictionaryId] = useState("");

  useEffect(() => {
    loadDictionaries();
  }, []);

  const loadDictionaries = async () => {
    const data = await getDictionaries();

    setDictionaries(data);
  };
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
