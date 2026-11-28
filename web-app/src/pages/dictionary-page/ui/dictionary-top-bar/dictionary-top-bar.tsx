import { useAddWordStore } from "@entities/word";
import { ShuffleButton } from "@features/shuffle-words";
import { UnshuffleButton } from "@features/unshuffle-words";
import { cx } from "@shared/lib/styles";
import { TextButton } from "@shared/ui/buttons";

import { CloseCircleOutline, Search } from "@shared/ui/icons";
import { useState } from "react";
import s from "./dictionary-top-bar.module.scss";

import { useSearchStore } from "../../model/use-search-store";

export const DictionaryTopBar = () => {
  const { openCardCreateWord } = useAddWordStore();

  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const { searchInputValue, setSearchInputValue } = useSearchStore();

  const handleSearch = () => {
    if (!isSearchActive) return;
    console.log(searchInputValue);
  };

  return (
    <div className={s.topBarOverlay}>
      <header className={s.topBar}>
        <TextButton
          as="button"
          onClick={(e) => {
            if (isSearchActive) return;

            e.stopPropagation();
            setIsSearchActive(true);
          }}
          className={cx(s.searchButton, isSearchActive && s.activeSearch)}
        >
          <Search onClick={handleSearch} />

          <input
            name="search-input"
            type="text"
            className={s.searchInput}
            placeholder="Search word..."
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />

          {isSearchActive && (
            <CloseCircleOutline
              onClick={() => {
                setIsSearchActive(false);
                setSearchInputValue("");
              }}
            />
          )}
        </TextButton>

        {!isSearchActive && (
          <>
            <UnshuffleButton />

            <ShuffleButton />

            <TextButton
              className={s.buttonNewWord}
              as="button"
              onClick={openCardCreateWord}
            >
              +
            </TextButton>
          </>
        )}
      </header>
    </div>
  );
};
