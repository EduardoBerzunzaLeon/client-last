import { Generic } from '../interfaces/generic';

export const convertObjectToArray = <T>(modelPropierties: string[], model: Generic) => (
  modelPropierties.reduce((previous: T[], current: string) => (
    (current in model)
      ? [ ...previous, model[current] ]
      : previous), [])
);

export default {
  convertObjectToArray,
};
