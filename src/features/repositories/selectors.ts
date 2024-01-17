import { RootState } from '@app/store';

export const getRepositories = (state: RootState) => {
  return state.repositories.items;
};

export const getCurrentRepoIndex = (state: RootState) => {
  return state.repositories.currentRepoIndex;
};
