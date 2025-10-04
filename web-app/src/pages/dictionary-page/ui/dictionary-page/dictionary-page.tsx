import { WordList } from "@/widgets/word-list";
import { HeaderDictionaryPage } from "../header-dictionary-page/header-dictionary-page";

import s from "./dictionary-page.module.scss";

export const DictionaryPage = () => {
  return (
    <div className={s.dictionaryPage}>
      <HeaderDictionaryPage />

      <WordList />
    </div>
  );
};
