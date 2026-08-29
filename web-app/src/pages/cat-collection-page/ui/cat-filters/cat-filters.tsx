import { useCatCollectionStore } from "../../model/use-cat-collection-store";
import type { CatRarity, SortOrder } from "../../model/types";
import s from "./cat-filters.module.scss";

const RARITY_CHIPS: Array<CatRarity | "all"> = [
  "all",
  "Common",
  "Rare",
  "Epic",
  "Legendary",
];

export const CatFilters = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedRarity,
    setSelectedRarity,
    sortOrder,
    setSortOrder,
  } = useCatCollectionStore();

  return (
    <div className={s.filtersContainer}>
      <div className={s.topRow}>
        <div className={s.searchWrapper}>
          <span className={s.searchIcon}>🔍</span>
          <input
            type="text"
            className={s.searchInput}
            placeholder="Пошук за ім'ям, породою, локацією..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className={s.clearBtn}
              onClick={() => setSearchQuery("")}
            >
              ✕
            </button>
          )}
        </div>

        <div className={s.sortWrapper}>
          <label htmlFor="sortOrderSelect" className={s.sortLabel}>Сортування:</label>
          <select
            id="sortOrderSelect"
            className={s.sortSelect}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          >
            <option value="newest">📅 Найновіші</option>
            <option value="oldest">⏳ Найстаріші</option>
            <option value="rarity">✨ За рідкістю</option>
            <option value="name">🔤 За ім&apos;ям</option>
          </select>
        </div>
      </div>

      <div className={s.chipsRow}>
        {RARITY_CHIPS.map((r) => (
          <button
            key={r}
            type="button"
            className={`${s.chip} ${r !== "all" ? s[r.toLowerCase()] : ""} ${
              selectedRarity === r ? s.activeChip : ""
            }`}
            onClick={() => setSelectedRarity(r)}
          >
            {r === "all" ? "Всі коти" : r}
          </button>
        ))}
      </div>
    </div>
  );
};
