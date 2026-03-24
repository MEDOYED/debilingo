// import { WordList } from "@/widgets/word-list";
// import { HeaderDictionaryPage } from "../header-dictionary-page/header-dictionary-page";

import type { Word } from "@/shared/api/wordApi";
import { createWord, deleteWord, getWords } from "@/shared/api/wordApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import s from "./dictionary-page.module.scss";

export const DictionaryPage = () => {
  const { dictId } = useParams();
  const navigate = useNavigate();
  const [words, setWords] = useState<Word[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newWord, setNewWord] = useState({
    source_word: "",
    note: "",
    translations: [""],
    definitions: [""],
    examples: [""],
  });

  useEffect(() => {
    if (dictId) loadWords();
  }, [dictId]);

  const loadWords = async () => {
    if (!dictId) return;
    const data = await getWords(dictId);
    setWords(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit clicked", newWord);

    try {
      if (!dictId) return;

      await createWord({
        dictionary_id: dictId,
        source_word: newWord.source_word,
        note: newWord.note,
        translations: newWord.translations.filter((t) => t.trim()),
        definitions: newWord.definitions.filter((d) => d.trim()),
        examples: newWord.examples.filter((e) => e.trim()),
      });
      console.log("Word created");

      setNewWord({
        source_word: "",
        note: "",
        translations: [""],
        definitions: [""],
        examples: [""],
      });
      setShowModal(false);
      loadWords();
    } catch (err: any) {
      console.error("Error:", err);
    }
  };

  const handleDelete = async (wordId: string) => {
    await deleteWord(wordId);
    loadWords();
  };

  const addField = (field: "translations" | "definitions" | "examples") => {
    setNewWord({ ...newWord, [field]: [...newWord[field], ""] });
  };

  const updateField = (
    field: "translations" | "definitions" | "examples",
    index: number,
    value: string
  ) => {
    const arr = [...newWord[field]];
    arr[index] = value;
    setNewWord({ ...newWord, [field]: arr });
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>
      <h1>Words</h1>
      <button onClick={() => setShowModal(true)}>+ Add Word</button>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ background: "white", padding: "20px", margin: "50px" }}>
            <h2>Add Word</h2>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Source word"
                value={newWord.source_word}
                onChange={(e) =>
                  setNewWord({ ...newWord, source_word: e.target.value })
                }
              />
              <br />
              <label>Translations:</label>
              {newWord.translations.map((t, i) => (
                <input
                  key={i}
                  value={t}
                  onChange={(e) =>
                    updateField("translations", i, e.target.value)
                  }
                  placeholder={`Translation ${i + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={() => addField("translations")}
              >
                +
              </button>
              <br />
              <label>Definitions:</label>
              {newWord.definitions.map((d, i) => (
                <input
                  key={i}
                  value={d}
                  onChange={(e) =>
                    updateField("definitions", i, e.target.value)
                  }
                  placeholder={`Definition ${i + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={() => addField("definitions")}
              >
                +
              </button>
              <br />
              <label>Examples:</label>
              {newWord.examples.map((e, i) => (
                <input
                  key={i}
                  value={e}
                  onChange={(e) => updateField("examples", i, e.target.value)}
                  placeholder={`Example ${i + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={() => addField("examples")}
              >
                +
              </button>
              <br />
              <input
                placeholder="Note"
                value={newWord.note}
                onChange={(e) =>
                  setNewWord({ ...newWord, note: e.target.value })
                }
              />
              <br />
              <button type="submit">Save</button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <table
        border={1}
        cellPadding="5"
        style={{ marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Word</th>
            <th>Translations</th>
            <th>Definitions</th>
            <th>Examples</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.id}>
              <td>{word.source_word}</td>
              <td>{word.translations.map((t) => t.text).join(", ")}</td>
              <td>{word.definitions.map((d) => d.text).join(", ")}</td>
              <td>{word.examples.map((e) => e.text).join(", ")}</td>
              <td>{word.note}</td>
              <td>
                <button onClick={() => handleDelete(word.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

//   return (
//     <div className={s.dictionaryPage}>
//       <HeaderDictionaryPage />

//       <WordList />
//     </div>
//   );
// };
