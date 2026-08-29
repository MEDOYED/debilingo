import { useCatCatchStore } from "../../model/use-cat-catch-store";
import type { CatRarity } from "../../model/types";
import s from "./catch-form.module.scss";

const RARITIES: CatRarity[] = ["Common", "Rare", "Epic", "Legendary"];

export const CatchForm = () => {
  const {
    name,
    setName,
    breed,
    setBreed,
    rarity,
    setRarity,
    notes,
    setNotes,
    locationName,
    setLocationName,
    isSubmitting,
    submitError,
    saveCatch,
    resetCatch,
  } = useCatCatchStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveCatch();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h2 className={s.formTitle}>✨ Новий трофей Catemon!</h2>

      {submitError && (
        <div className={s.errorBanner}>
          ⚠️ {submitError}
        </div>
      )}

      {/* Name Input */}
      <div className={s.fieldGroup}>
        <label htmlFor="catName" className={s.label}>
          Ім&apos;я котика <span className={s.required}>*</span>
        </label>
        <div className={s.inputWrapper}>
          <input
            id="catName"
            type="text"
            className={s.textInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="напр. Мурчик, Рижик..."
            required
          />
        </div>
      </div>

      {/* Rarity Selector */}
      <div className={s.fieldGroup}>
        <label className={s.label}>Рідкість знахідки</label>
        <div className={s.rarityGrid}>
          {RARITIES.map((r) => (
            <button
              key={r}
              type="button"
              className={`${s.rarityOption} ${s[r.toLowerCase()]} ${
                rarity === r ? s.selected : ""
              }`}
              onClick={() => setRarity(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Breed Input */}
      <div className={s.fieldGroup}>
        <label htmlFor="catBreed" className={s.label}>
          Порода / Окрас (опціонально)
        </label>
        <input
          id="catBreed"
          type="text"
          className={s.textInput}
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          placeholder="напр. Смугастий, Британський, Сіамський..."
        />
      </div>

      {/* Location Name */}
      <div className={s.fieldGroup}>
        <label htmlFor="locationName" className={s.label}>
          Назва локації / Орієнтир
        </label>
        <input
          id="locationName"
          type="text"
          className={s.textInput}
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          placeholder="напр. Кав'ярня біля парку, Двір #4..."
        />
      </div>

      {/* Notes Textarea */}
      <div className={s.fieldGroup}>
        <label htmlFor="catNotes" className={s.label}>
          Історія знахідки / Нотатки
        </label>
        <textarea
          id="catNotes"
          className={s.textarea}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Який у нього був настрій? Що він робив?"
        />
      </div>

      {/* Action Buttons */}
      <div className={s.actions}>
        <button
          type="submit"
          className={s.saveBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "⏳ Збереження..." : "💾 Зберегти в колекцію"}
        </button>

        <button
          type="button"
          className={s.retakeBtn}
          onClick={resetCatch}
          disabled={isSubmitting}
        >
          🔄 Перезняти фото
        </button>
      </div>
    </form>
  );
};
