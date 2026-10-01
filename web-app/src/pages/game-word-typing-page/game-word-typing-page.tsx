import { useEffect, useState } from "react";

import {
  DropdownSelect,
  type DropdownOption,
} from "@shared/ui/dropdown-select";
import { getDictionaries, useDictionariesStore } from "@entities/dictionary";
import { FilledButton } from "@shared/ui/buttons";

import { WordTyping } from "./ui/word-typing";
import { ResultsScreen } from "./ui/results-screen/results-screen";
import type { GameScreen } from "./model/types";

import s from "./game-word-typing-page.module.scss";

type KeyboardOptions = "System keyboard" | "On-screen keyboard";

const KEYBOARD_OPTIONS: KeyboardOptions[] = [
  "System keyboard",
  "On-screen keyboard",
];

const GAME_DURATIONS: DropdownOption<number>[] = [
  { value: 60, label: "1 min." },
  { value: 120, label: "2 min." },
  { value: 300, label: "5 min." },
];

export const GameWordTypingPage = () => {
  const { dictionaries, setDictionaries } = useDictionariesStore();

  const [screen, setScreen] = useState<GameScreen>("setup");
  const [selectedDictionaryId, setSelectedDictionaryId] = useState<
    string | null
  >(null);
  const [selectedKeyboard, setSelectedKeyboard] = useState<KeyboardOptions>(
    KEYBOARD_OPTIONS[0]
  );
  const [selectedGameDuration, setSelectedGameDuration] = useState<number>(
    GAME_DURATIONS[1].value
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
    <main className={s.page}>
      {screen === "setup" && (
        <div className={s.container}>
          <div className={s.titleAndSelectWrapper}>
            <h1 className={s.gameName}>Word Typing</h1>

            <DropdownSelect
              dropdownItems={preparedDictionariesToDropdown}
              selectedValue={selectedDictionaryId}
              onSelect={({ newSelectedItem }) =>
                setSelectedDictionaryId(newSelectedItem.value)
              }
              label="Choose language"
            />

            <DropdownSelect
              dropdownItems={GAME_DURATIONS}
              label="Game duration"
              selectedValue={selectedGameDuration}
              onSelect={({ newSelectedItem }) =>
                setSelectedGameDuration(newSelectedItem.value)
              }
            />

            <DropdownSelect
              dropdownItems={KEYBOARD_OPTIONS}
              onSelect={({ newSelectedItem }) =>
                setSelectedKeyboard(newSelectedItem.label as KeyboardOptions)
              }
              label="Choose keyboard type"
              selectedValue={selectedKeyboard}
            />
          </div>

          <FilledButton
            as="button"
            onClick={() => setScreen("game")}
            disabled={!selectedDictionaryId}
            size="large"
          >
            Start game
          </FilledButton>
        </div>
      )}

      {screen === "game" && selectedDictionaryId && (
        <WordTyping
          setScreen={setScreen}
          dictionaryId={selectedDictionaryId}
          gameDuration={selectedGameDuration}
        />
      )}

      {screen === "results" && <ResultsScreen />}
    </main>
  );
};
