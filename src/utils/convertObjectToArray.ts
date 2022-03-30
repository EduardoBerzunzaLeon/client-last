import { Generic } from '../interfaces/generic';

export const convertObjectToArray = <T>(pos: string, model: Generic) => {
  const newPosition = pos.split('/');
  return newPosition.reduce((acc: T[], cur: string) => (
    (cur in model)
      ? [ ...acc, model[cur] ]
      : acc), []);
};

export default {
  convertObjectToArray,
};
