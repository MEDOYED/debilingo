import { useEffect, useState } from "react";

import {
  DropdownSelect,
  type DropdownOption,
} from "@shared/ui/dropdown-select";
import { useDictionariesStore } from "@widgets/dictionaries-list-section";

import { WordTyping } from "./ui/word-typing";

import s from "./game-word-typing-page.module.scss";

// todo [28.09.2026]: fix this
import { getDictionaries } from "@shared/api/dictionaryApi";

type KeyboardOptions = "Нативна від телефону" | "Клавіатура від debilingo";

const KEYBOARD_OPTIONS: KeyboardOptions[] = [
  "Нативна від телефону",
  "Клавіатура від debilingo",
];

export const GameWordTypingPage = () => {
  const [startGame, setStartGame] = useState(false);
  const { dictionaries, setDictionaries } = useDictionariesStore();

  const [selectedDictionaryId, setSelectedDictionaryId] = useState<
    string | null
  >(null);
  const [selectedKeyboard, setSelectedKeyboard] = useState<KeyboardOptions>(
    "Нативна від телефону"
  );

  const preparedDictionariesToDropdown: DropdownOption[] = dictionaries.map(
    (dictionary) => {
      return {
        value: dictionary.id,
        label: dictionary.main_language,
      };
    }
  );

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
      {startGame && selectedDictionaryId ? (
        <WordTyping
          setStartGame={setStartGame}
          dictionaryId={selectedDictionaryId}
        />
      ) : (
        <div className={s.container}>
          <div className={s.gameNameAndSelect}>
            <h1 className={s.gameName}>Word Typing</h1>

            <DropdownSelect
              dropdownItems={preparedDictionariesToDropdown}
              selectedValue={selectedDictionaryId}
              onSelect={({ newSelectedItem }) =>
                setSelectedDictionaryId(newSelectedItem.value)
              }
              label="Вибери мову"
            />

            <DropdownSelect
              dropdownItems={KEYBOARD_OPTIONS}
              onSelect={({ newSelectedItem }) =>
                setSelectedKeyboard(newSelectedItem.label as KeyboardOptions)
              }
              label="Виберіть клавіатуру"
              selectedValue={selectedKeyboard}
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
