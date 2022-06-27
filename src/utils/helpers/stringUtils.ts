export const ucWords = (element: string) => element?.replace(/(?<= )[^\s]|^./g, (a) => a.toUpperCase());

export default {
  ucWords,
};
