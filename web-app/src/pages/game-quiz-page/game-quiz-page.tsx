import { useEffect, useState } from "react";

import { useDictionariesStore } from "@entities/dictionary";
import {
  DropdownSelect,
  type DropdownOption,
} from "@shared/ui/dropdown-select";

import { Quiz } from "./ui/quiz/quiz";

import s from "./game-quiz-page.module.scss";

export const GameQuizPage = () => {
  const [startGame, setStartGame] = useState(false);
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
      {startGame ? (
        <Quiz
          setStartGame={setStartGame}
          dictionaryId={selectedDictionaryId}
        />
      ) : (
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
            onClick={() => setStartGame(true)}
          >
            Start Game
          </button>
        </div>
      )}
    </main>
  );
};
