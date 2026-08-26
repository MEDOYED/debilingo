// import { ProgressBar } from "@pages/game-quiz-page/ui/progress-bar/progress-bar";
import { useEffect, useState } from "react";
import s from "./game-word-typing-page.module.scss";
import { useDictionariesStore } from "@widgets/dictionaries-list-section";
import { getDictionaries } from "@shared/api/dictionaryApi";
import { WordTyping } from "./ui/word-typing/word-typing";
import { CustomSelect } from "@pages/game-quiz-page/ui/custom-select/custom-select";
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
