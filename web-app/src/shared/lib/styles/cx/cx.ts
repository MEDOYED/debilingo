type CxParam = string | boolean;

export const cx = (...params: CxParam[]) => {
  const readyParams: string[] = [];

  for (const param of params) {
    if (typeof param === "string" && param.trim() !== "") {
      readyParams.push(param.trim());
    }
  }

  const readyClassName = readyParams.join(" ");

  return readyClassName;
};
