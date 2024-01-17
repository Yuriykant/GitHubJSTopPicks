import { IRepository } from '@features/repositories/types';

export const apiFetchPopularRepositories = (): Promise<IRepository[]> => {
  return fetch('https://api.github.com/search/repositories?q=JavaScript&sort=stars&per_page=30')
    .then((response) => response.json())
    .then((json) => json.items);
};
