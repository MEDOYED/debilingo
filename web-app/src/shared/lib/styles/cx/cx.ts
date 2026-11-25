export const cx = (...params: string[]) => {
  const paramsWithoutEmptyString = params.filter(
    (param) => param.trim() !== ""
  );

  const readyClassName = paramsWithoutEmptyString.join(" ");

  return readyClassName;
};
