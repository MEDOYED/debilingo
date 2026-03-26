type Mods = Record<string, boolean | string | undefined>;

/**
 * Утиліта для формування className з урахуванням CSS модулів
 * @param cls - основний клас
 * @param mods - об'єкт з модифікаторами {className: boolean}
 * @param additional - масив додаткових класів
 * @returns string - сформований className
 *
 * @example
 * cn(styles.button, { [styles.disabled]: true }, [styles.large])
 * // 'button disabled large'
 */
export function cn(
  cls: string,
  mods: Mods = {},
  additional: Array<string | undefined> = []
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(" ");
}
