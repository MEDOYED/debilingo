import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { deleteDictionary, getDictionaries } from "@shared/api/dictionaryApi";
import { cn } from "@shared/lib/styles";
import { FilledButton, TextButton } from "@shared/ui/buttons";
import { Trash } from "@shared/ui/icons";

import { useAddDictionaryStore } from "./model/use-add-dictionary-store";
import { useDictionariesStore } from "./model/use-dictionaries-store";
import { AddDictionaryCard } from "./ui/add-dictionary-card/add-dictionary-card";

import s from "./dictionaries-list-section.module.scss";

export const DictionariesListSection = () => {
  const { dictionaries, setDictionaries } = useDictionariesStore();
  const [idDeleteCardOpen, setIdDeleteCardOpen] = useState<null | string>(null);

  const { isOpenCardCreateDictionary, openCardCreateDictionary } =
    useAddDictionaryStore();

  useEffect(() => {
    loadDictionaries();
  }, []);

  const loadDictionaries = async () => {
    const data = await getDictionaries();

    setDictionaries(data);
  };

  const handleDelete = async (dictionaryId: string) => {
    await deleteDictionary(dictionaryId);
    loadDictionaries();
  };

  return (
    <section className={s.section}>
      <div className={s.titleRow}>
        <h2 className={s.sectionTitle}>Мої словники:</h2>

        <TextButton
          className={s.createDictionaryBtn}
          as="button"
          onClick={openCardCreateDictionary}
        >
          Створити новий словник
        </TextButton>
      </div>

      <ul className={s.list}>
        {dictionaries.map((dictionary) => {
          if (idDeleteCardOpen === dictionary.id) {
            return (
              <li
                className={cn(s.card, s.cardForDeletion)}
                key={dictionary.id}
              >
                <h3 className={s.card__title}>
                  <span>{dictionary.main_language}</span>
                  <span>-</span>
                  <span>{dictionary.secondary_language}</span>
                </h3>

                <TextButton
                  as="button"
                  onClick={() => setIdDeleteCardOpen(null)}
                >
                  Відмінити видалення
                </TextButton>

                <FilledButton
                  as="button"
                  variant="error"
                  onClick={() => handleDelete(idDeleteCardOpen!)} // ! --> idDeleteCardOpen !== null
                >
                  Підтвердити видалення
                </FilledButton>
              </li>
            );
          }

          return (
            <li
              className={s.card}
              key={dictionary.id}
            >
              <Link
                className={s.cardLink}
                to={`/dictionary/${dictionary.id}`}
              >
                <h3 className={s.card__title}>
                  <span>{dictionary.main_language}</span>
                  <span>-</span>
                  <span>{dictionary.secondary_language}</span>
                </h3>

                <p className={s.card__summary}>Кількість слів:</p>

                <div className={s.btnsWrapper}>
                  <TextButton
                    as="button"
                    onClick={() => {}} // todo [28.03.2026]: on Click open modal for word creation after navigation to dictionary 0.3s
                    // className={s.card__addWordButton}
                  >
                    Додати слово
                  </TextButton>

                  <TextButton
                    as="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIdDeleteCardOpen(dictionary.id);
                    }}
                  >
                    <Trash
                      color="rgb(255 180 171)"
                      size={30}
                    />
                  </TextButton>
                </div>
              </Link>
            </li>
          );
        })}

        {isOpenCardCreateDictionary && <AddDictionaryCard />}
      </ul>
    </section>
  );
};
