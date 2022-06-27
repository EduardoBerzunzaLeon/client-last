import { EmptyResponse, responsArrayRTK, responseRTK } from '../../interfaces';

export const invalidatesList = <
  R extends responseRTK | EmptyResponse,
  T extends string
>(tagType: T) => (
    resultsWithIds: R | undefined,
  ) => [{
    type: tagType,
    id: (
      resultsWithIds && 'data' in resultsWithIds && resultsWithIds.data?.id
    ) ? resultsWithIds.data.id : 'LIST',
  }];

export const providesList = <R extends responsArrayRTK | responseRTK, T extends string>(
  tagType: T) => (
    resultsWithIds: R | undefined,
  ) => ((resultsWithIds?.data && Array.isArray(resultsWithIds.data))
    ? [
      { type: tagType, id: 'LIST' },
      ...resultsWithIds.data.map(({ id }) => ({ type: tagType, id })),
    ]
    : [{ type: tagType, id: 'LIST' }]);

export default {
  invalidatesList,
  providesList,
};
