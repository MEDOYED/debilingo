import { MoneyActivityCalendar } from "@widgets/money-activity-calendar";
import { UserProfileCard } from "@widgets/user-profile-card";

import type { Dictionary } from "@shared/api/dictionaryApi";
import {
  createDictionary,
  deleteDictionary,
  getDictionaries,
} from "@shared/api/dictionaryApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import s from "./home-page.module.scss";

export const HomePage = () => {
  const navigate = useNavigate();
  const [dictionaries, setDictionaries] = useState<Dictionary[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newDict, setNewDict] = useState({
    name: "",
    main_language: "",
    secondary_language: "",
  });

  useEffect(() => {
    loadDictionaries();
  }, []);

  const loadDictionaries = async () => {
    const data = await getDictionaries();
    setDictionaries(data);
  };
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDictionary(newDict);
    setNewDict({ name: "", main_language: "", secondary_language: "" });
    setShowForm(false);
    loadDictionaries();
  };
  const handleDelete = async (id: string) => {
    await deleteDictionary(id);
    loadDictionaries();
  };
  return (
    <div className={s.pageHome}>
      <div className={s.leftCol}>
        <UserProfileCard />
      </div>

      <MoneyActivityCalendar />

      <div>
        <div>
          <h1>My Dictionaries</h1>
          <button onClick={() => setShowForm(!showForm)}>
            Create Dictionary
          </button>
          {showForm && (
            <form onSubmit={handleCreate}>
              <input
                placeholder="Dictionary name"
                value={newDict.name}
                onChange={(e) =>
                  setNewDict({ ...newDict, name: e.target.value })
                }
              />
              <input
                placeholder="Main language (e.g. en)"
                value={newDict.main_language}
                onChange={(e) =>
                  setNewDict({ ...newDict, main_language: e.target.value })
                }
              />
              <input
                placeholder="Secondary language (e.g. ua)"
                value={newDict.secondary_language}
                onChange={(e) =>
                  setNewDict({ ...newDict, secondary_language: e.target.value })
                }
              />
              <button type="submit">Save</button>
            </form>
          )}
          <div style={{ marginTop: "20px" }}>
            {dictionaries.map((dict) => (
              <div
                key={dict.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px 0",
                }}
              >
                <h3>
                  <b>{dict.main_language}</b> - {dict.secondary_language}
                </h3>
                <button
                  onClick={() => {
                    localStorage.setItem("lastDictionaryId", dict.id);
                    navigate(`/dictionary/${dict.id}`);
                  }}
                >
                  Add Words
                </button>
                <button onClick={() => handleDelete(dict.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

//   return (
//     <div className={s.pageHome}>
//       <div className={s.leftCol}>
//         <UserProfileCard />
//       </div>
//       <div>other content</div>

//       <MoneyActivityCalendar />
//     </div>
//   );
// };

// export default HomePage;
