import { Generic } from '../interfaces/generic';

export const convertArrayToObject = <T>(pos: string, model: Generic) => {
  const newPosition = pos.split('/');
  return newPosition.reduce((acc: T[], cur: string) => {
    if (cur in model) {
      return [ ...acc, model[cur] ];
    }
    return acc;
  }, []);
};

export default {
  convertArrayToObject,
};
