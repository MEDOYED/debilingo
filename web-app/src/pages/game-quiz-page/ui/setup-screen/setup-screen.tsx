import { useEffect } from "react";

import {
  DropdownSelect,
  type DropdownOption,
} from "@shared/ui/dropdown-select";
import s from "./setup-screen.module.scss";
import { useDictionariesStore } from "@entities/dictionary";
import { GAME_DURATIONS } from "@shared/config/games";

type SetupScreenProps = {
  selectedDictionaryId: string;
  onSelectDictionaryId: (id: string) => void;

  selectedGameDuration: number;
  onSelectGameDuration: (duration: number) => void;

  onStartGame: () => void;
};

export const SetupScreen = ({
  selectedDictionaryId,
  onSelectDictionaryId,

  selectedGameDuration,
  onSelectGameDuration,

  onStartGame,
}: SetupScreenProps) => {
  const { dictionaries, fetchDictionaries } = useDictionariesStore();

  const preparedDictionariesDropdownItems: DropdownOption[] = dictionaries.map(
    (dictionary) => {
      return {
        label: dictionary.main_language,
        value: dictionary.id,
      };
    }
  );

  useEffect(() => {
    fetchDictionaries();
  }, [fetchDictionaries]);

  return (
    <div className={s.container}>
      <div className={s.gameNameAndSelect}>
        <h1 className={s.gameName}>Quiz</h1>

        <DropdownSelect
          dropdownItems={preparedDictionariesDropdownItems}
          label="Choose language"
          onSelect={({ newSelectedItem }) =>
            onSelectDictionaryId(newSelectedItem.value)
          }
          selectedValue={selectedDictionaryId}
        />

        <DropdownSelect
          dropdownItems={GAME_DURATIONS}
          label="Game duration"
          selectedValue={selectedGameDuration}
          onSelect={({ newSelectedItem }) =>
            onSelectGameDuration(newSelectedItem.value)
          }
        />
      </div>

      <button
        disabled={!selectedDictionaryId}
        className={s.startGameButton}
        onClick={onStartGame}
      >
        Start Game
      </button>
    </div>
  );
};
