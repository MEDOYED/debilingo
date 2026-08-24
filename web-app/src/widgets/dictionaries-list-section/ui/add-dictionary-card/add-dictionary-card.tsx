import { createDictionary, getDictionaries } from "@shared/api/dictionaryApi";
import { cn } from "@shared/lib/styles";
import { FilledButton, TextButton } from "@shared/ui/buttons";
import { CustomSelect } from "@shared/ui/drop-down-selects";

import { useAddDictionaryStore } from "../../model/use-add-dictionary-store";
import { useDictionariesStore } from "../../model/use-dictionaries-store";

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

  const LANGUAGES = ["English", "German", "Polish", "Ukrainian", "Russian"];

  return (
    <li className={cn(c.card, c.cardInner, s.cardAddDictionary)}>
      <span>Main language</span>
      <CustomSelect
        setMainLanguage={setMainLanguage}
        languages={LANGUAGES}
        className={s.mainLanguage}
        dropdownClassName={s.dropdownClassName}
      />
      <span>Secondary language</span>
      <CustomSelect
        setSecondaryLanguage={setSecondaryLanguage}
        languages={LANGUAGES}
        className={s.secondaryLanguage}
        dropdownClassName={s.dropdownClassName}
      />

      <div className={s.btnsWrapper}>
        <TextButton
          as="button"
          onClick={closeCardCreateDictionary}
        >
          Cancel
        </TextButton>

        <FilledButton
          as="button"
          onClick={handleCreateDictionary}
        >
          Create
        </FilledButton>
      </div>
    </li>
  );
};
