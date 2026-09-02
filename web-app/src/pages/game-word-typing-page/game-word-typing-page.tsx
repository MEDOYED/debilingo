import { useEffect, useState } from "react";

import { useDictionariesStore } from "@widgets/dictionaries-list-section";
import { getDictionaries } from "@shared/api/dictionaryApi";
import { CustomSelect } from "@pages/game-quiz-page/ui/custom-select/custom-select";

import { WordTyping } from "./ui/word-typing";

import s from "./game-word-typing-page.module.scss";

export const GameWordTypingPage = () => {
  const [startGame, setStartGame] = useState(false);
  const { dictionaries, setDictionaries } = useDictionariesStore();
  const [dictionaryId, setDictionaryId] = useState("");

  useEffect(() => {
    const firstLoad = async () => {
      if (dictionaries.length !== 0) return;

      const data = await getDictionaries();

      setDictionaries(data);
    };

    firstLoad();
  }, []);

  return (
    <main>
      {startGame ? (
        <WordTyping
          setStartGame={setStartGame}
          dictionaryId={dictionaryId}
        />
      ) : (
        <div className={s.container}>
          <div className={s.gameNameAndSelect}>
            <h1 className={s.gameName}>Word Typing</h1>

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
