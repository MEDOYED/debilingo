import { createDictionary, getDictionaries } from "@shared/api/dictionaryApi";
import { cn } from "@shared/lib/styles";
import { FilledButton, TextButton } from "@shared/ui/buttons";

import { useAddDictionaryStore } from "../../model/use-add-dictionary-store";
import { useDictionariesStore } from "../../model/use-dictionaries-store";
import { LanguageField } from "../language-field/language-field";

import c from "../../styles/common.module.scss";
import s from "./add-dictionary-card.module.scss";

export const AddDictionaryCard = () => {
  const {
    mainLanguage,
    setMainLanguage,
    secondaryLanguage,
    setSecondaryLanguage,
    closeCardCreateDictionary,
    resetFields,
  } = useAddDictionaryStore();

  const { setDictionaries } = useDictionariesStore();

  const loadDictionaries = async () => {
    const data = await getDictionaries();
    setDictionaries(data);
  };

  const data = {
    name: `${mainLanguage} - ${secondaryLanguage}`,
    main_language: mainLanguage,
    secondary_language: secondaryLanguage,
  };

  const handleCreateDictionary = async () => {
    await createDictionary(data);
    resetFields();
    loadDictionaries();
    closeCardCreateDictionary();
  };

  return (
    <li className={cn(c.card, c.cardInner, s.cardAddDictionary)}>
      <LanguageField
        variant="main"
        value={mainLanguage}
        onChange={setMainLanguage}
      />

      <LanguageField
        variant="secondary"
        value={secondaryLanguage}
        onChange={setSecondaryLanguage}
      />

      <div className={s.btnsWrapper}>
        <TextButton
          as="button"
          onClick={closeCardCreateDictionary}
        >
          Відмінити
        </TextButton>

        <FilledButton
          as="button"
          onClick={handleCreateDictionary}
        >
          Створити
        </FilledButton>
      </div>
    </li>
  );
};
