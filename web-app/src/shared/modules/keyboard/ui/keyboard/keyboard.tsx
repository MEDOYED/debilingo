type KeyboardProps = {
  defaultLanguage: "english (qwerty)";
};

export const Keyboard = ({ defaultLanguage }: KeyboardProps) => {
  return <div>{defaultLanguage}</div>;
};
