type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | { [key: string]: any };

export function cn(...args: ClassValue[]): string {
  const classes: string[] = [];

  args.forEach((arg) => {
    // Пропускаємо falsy значення (undefined, null, false, 0, '')
    if (!arg) return;

    const argType = typeof arg;

    // Рядки та числа додаємо напряму
    if (argType === "string" || argType === "number") {
      classes.push(String(arg));
    }
    // Масиви обробляємо рекурсивно
    else if (Array.isArray(arg)) {
      const inner = cn(...arg);
      if (inner) {
        classes.push(inner);
      }
    }
    // Об'єкти - беремо ключі, де значення truthy
    else if (argType === "object") {
      Object.entries(arg as Record<string, any>).forEach(([key, value]) => {
        if (value) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(" ");
}
