interface IncreaseBy {
    value: number,
    maxValue: number,
    minValue?: number,
}

export const increaseBy = ({
  value,
  maxValue,
  minValue = 0,
}: IncreaseBy) => Math.max(Math.min(value, maxValue), minValue);

export default {
  increaseBy,
};
