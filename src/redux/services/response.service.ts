import { responsArrayRTK, responseRTK } from '../../interfaces/api';

export const invalidatesList = <R extends responseRTK, T extends string>(tagType: T) => (
  resultsWithIds: R | undefined,
) => [{ type: tagType, id: resultsWithIds?.data?.id ?? 'LIST' }];

export const providesList = <R extends responsArrayRTK, T extends string>(
  tagType: T) => (
    resultsWithIds: R | undefined,
  ) => (resultsWithIds
    ? [
      { type: tagType, id: 'LIST' },
      ...resultsWithIds.data.map(({ id }) => ({ type: tagType, id })),
    ]
    : [{ type: tagType, id: 'LIST' }]);

export default {
  invalidatesList,
  providesList,
};
