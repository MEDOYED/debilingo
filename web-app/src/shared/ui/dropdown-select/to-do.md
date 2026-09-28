# TODO: Покращення типізації через Дженерики (Generics) у `DropdownSelect`

Цей документ містить детальне теоретичне пояснення дженериків у TypeScript та покрокову інструкцію, як перевести компонент `DropdownSelect` на строгу типізацію, щоб позбутися приведення типів `as KeyboardOptions`.

---

## 1. Що таке Дженерики (Generics) простими словами?

### Аналогія: Дженерик — це «змінна для типів»

Звичайні функції в JavaScript приймають **значення як аргументи**:

```ts
function double(x: number) {
  return x * 2;
}
// Ми передаємо конкретне число 5: double(5)
```

А **дженерики** в TypeScript дозволяють передавати **ТИП як аргумент**:

```ts
function wrapInBox<T>(item: T) {
  return { boxContent: item };
}
```

Тут `<T>` — це просто умовна назва (від слова _Type_). Замість `T` можна було б написати будь-що, наприклад `<CustomType>`, але за домовленістю пишуть одну літеру `T`.

### Ти вже використовуєш дженерики щодня!

Кожного разу, коли ти пишеш:

- `useState<string | null>(null)` — ти передаєш тип `string | null` у дженерик-хук `useState`.
- `useState<KeyboardOptions>("Нативна від телефону")` — передаєш тип `KeyboardOptions`.
- `Promise<Dictionary[]>` — проміс, який поверне масив словників.
- `Array<string>` (або `string[]`) — масив рядків.

Усе це — вбудовані дженерики. А тепер ми навчимося створювати **свої власні дженерик-компоненти**.

---

## 2. У чому проблема нашого `DropdownSelect` зараз?

Зараз у нас типи захардкоджені під звичайний `string`:

```ts
export type DropdownOption = {
  value: string; // <-- Завжди просто string!
  label: string;
};
```

Коли ти передаєш у компонент масив:

```ts
type KeyboardOptions = "Нативна від телефону" | "Клавіатура від debilingo";
const KEYBOARD_OPTIONS: KeyboardOptions[] = [...];
```

Що відбувається:

1. `DropdownSelect` приймає твій масив, але його тип очікує звичайний `string`.
2. Компонент **«забуває»**, що варіанти були суворим типом `KeyboardOptions`, і вважає їх просто будь-яким рядком (`string`).
3. Коли спрацьовує `onSelect`, він повертає `newSelectedItem.value` як загальний `string`.
4. А твій стейт вимагає строго `KeyboardOptions`:
   ```ts
   setSelectedKeyboard(newSelectedItem.value);
   // ❌ Помилка: string не можна присвоїти в "Нативна..." | "Клавіатура..."
   ```

Щоб тимчасово заглушити це, використовують `as KeyboardOptions` (Type Assertion — ми кажемо TypeScript: «повір мені, там точно один з цих варіантів»).  
Але **правильний спосіб** — зробити так, щоб компонент сам **не забував початковий тип**.

---

## 3. Анатомія дженерика: `<T extends string = string>`

Давай розберемо цю конструкцію по частинах:

1. **`<T>`** — оголошення типу-параметра. Компонент тепер каже: _«Я працюватиму з якимось типом `T`, який визначиться в момент мого виклику»_.
2. **`extends string`** — це **обмеження (Generic Constraint)**. Ми кажемо: _«Тип `T` може бути будь-яким, але він ОБОВ'ЯЗКОВО має бути рядком або підвидом рядка (наприклад, юніоном рядків-літералів)"_.  
   Без цього обмеження хтось міг би передати об'єкт або число, що зламало б компонент.
3. **`= string`** — це **значення за замовчуванням (Default Type)**. Якщо розробник передає звичайні рядки і не вказує точний юніон, `T` автоматично стане простим `string`.

Разом: `<T extends string = string>` означає:

> «Я приймаю тип `T`, який є якимось рядком (за замовчуванням — звичайний `string`)».

---

## 4. Покроковий перехід `DropdownSelect` на Generics

### Крок 1: Додаємо `<T extends string = string>` до типів

```ts
// Було:
export type DropdownOption = {
  value: string;
  label: string;
};

// Стало:
export type DropdownOption<T extends string = string> = {
  value: T; // <-- Тепер value має тип T, а не просто string!
  label: string;
};

// DropdownItem тепер теж параметризований
export type DropdownItem<T extends string = string> = T | DropdownOption<T>;

// Аргументи колбеку
type OnSelectedItemChangeArgs<T extends string = string> = {
  newSelectedItem: DropdownOption<T>;
};

// Пропси компонента
type DropdownSelectProps<T extends string = string> = {
  dropdownItems: DropdownItem<T>[];
  selectedValue: T | null;
  onSelect: ({ newSelectedItem }: OnSelectedItemChangeArgs<T>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};
```

---

### Крок 2: Додаємо дженерик до самого React-компонента

У файлах `.tsx` є одна синтаксична особливість:  
Якщо написати просто `export const DropdownSelect = <T>(...)`, компілятор TSX подумає, що `<T>` — це незакритий HTML-тег (як `<div>`), і покаже синтаксичну помилку.

Але коли ми пишемо `export const DropdownSelect = <T extends string = string>(...)`, завдяки слову `extends` TypeScript чітко розуміє, що це дженерик!

```tsx
export const DropdownSelect = <T extends string = string>({
  dropdownItems,
  selectedValue,
  onSelect,
  placeholder = "Choose value",
  className,
  disabled = false,
}: DropdownSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  // Нормалізуємо елементи, явно зберігаючи тип T:
  const normalizedOptions: DropdownOption<T>[] = dropdownItems.map((item) =>
    typeof item === "string" ? { value: item as T, label: item } : item
  );

  const selectedOption = normalizedOptions.find(
    (option) => option.value === selectedValue
  );

  // Решта коду залишається абсолютно такою ж!
  ...
```

---

## 5. Як це працюватиме на практиці (Автоматичний вивід типів)

Тобі навіть **не доведеться вручну передавати тип** при виклику компонента. TypeScript має механізм **Type Inference (Виведення типів)**.

### Приклад 1: Вибір словників (працює як звичайний `string`)

```tsx
const preparedDictionariesToDropdown: DropdownOption[] = dictionaries.map(
  (d) => ({
    value: d.id, // string
    label: d.main_language,
  })
);

<DropdownSelect
  dropdownItems={preparedDictionariesToDropdown}
  selectedValue={selectedDictionaryId}
  onSelect={({ newSelectedItem }) => {
    // TypeScript автоматично розуміє: тут T = string
    // newSelectedItem.value має тип string
    setSelectedDictionaryId(newSelectedItem.value);
  }}
  placeholder="Вибери мову"
/>;
```

### Приклад 2: Вибір клавіатури (працює строго з `KeyboardOptions`)

```tsx
type KeyboardOptions = "Нативна від телефону" | "Клавіатура від debilingo";

const KEYBOARD_OPTIONS: KeyboardOptions[] = [
  "Нативна від телефону",
  "Клавіатура від debilingo",
];

<DropdownSelect
  dropdownItems={KEYBOARD_OPTIONS}
  selectedValue={selectedKeyboard}
  onSelect={({ newSelectedItem }) => {
    // ВАУ! TypeScript сам побачив KEYBOARD_OPTIONS і підставив T = KeyboardOptions!
    // newSelectedItem.value ТЕПЕР МАЄ ТИП KeyboardOptions, а не string!
    setSelectedKeyboard(newSelectedItem.value); // ✅ Жодних помилок! Без всяких 'as'!
  }}
  placeholder="Виберіть клавіатуру"
/>;
```

---

## 6. Чеклист для виконання в майбутньому

Коли вирішиш це зробити:

- [ ] Відкрити `web-app/src/shared/ui/dropdowns/dropdown-select/dropdown-select.tsx`.
- [ ] Оновити типи `DropdownOption`, `DropdownItem`, `OnSelectedItemChangeArgs`, `DropdownSelectProps`, додавши `<T extends string = string>`.
- [ ] Додати `<T extends string = string>` до оголошення `export const DropdownSelect = ...`.
- [ ] У `normalizedOptions` вказати тип `DropdownOption<T>[]` та `item as T`.
- [ ] Відкрити `game-word-typing-page.tsx` і видалити `as KeyboardOptions` — перевірити, що TypeScript більше не свариться!
