import { useEffect, useState } from "react";

import { useDictionariesStore } from "@entities/dictionary";
import {
  DropdownSelect,
  type DropdownOption,
} from "@shared/ui/dropdown-select";
import type { GameScreen } from "@shared/types";

import { QuizGameScreen } from "./ui/quiz-game-screen/quiz-game-screen";

import s from "./game-quiz-page.module.scss";

export const GameQuizPage = () => {
  const [screen, setScreen] = useState<GameScreen>("setup");
  const { dictionaries, fetchDictionaries } = useDictionariesStore();
  const [selectedDictionaryId, setSelectedDictionaryId] = useState<string>("");

  useEffect(() => {
    fetchDictionaries();
  }, [fetchDictionaries]);

  const preparedDictionariesDropdownItems: DropdownOption[] = dictionaries.map(
    (dictionary) => {
      return {
        label: dictionary.main_language,
        value: dictionary.id,
      };
    }
  );

  return (
    <main>
      {screen === "setup" && (
        <div className={s.container}>
          <div className={s.gameNameAndSelect}>
            <h1 className={s.gameName}>Quiz</h1>

            <DropdownSelect
              dropdownItems={preparedDictionariesDropdownItems}
              label="Choose language"
              onSelect={({ newSelectedItem }) =>
                setSelectedDictionaryId(newSelectedItem.value)
              }
              selectedValue={selectedDictionaryId}
            />
          </div>

          <button
            disabled={!selectedDictionaryId}
            className={s.startGameButton}
            onClick={() => setScreen("game")}
          >
            Start Game
          </button>
        </div>
      )}

      {screen === "game" && (
        <QuizGameScreen
          setScreen={setScreen}
          dictionaryId={selectedDictionaryId}
        />
      )}
    </main>
  );
};
