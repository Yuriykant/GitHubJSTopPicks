import { IRepository } from '@features/repositories/types';

const githubApiUrl = 'https://api.github.com';
const githubToken = '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';
const requestHeaders = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${githubToken}`,
};

export const apiFetchPopularRepositories = (): Promise<IRepository[]> => {
  return fetch(`${githubApiUrl}/search/repositories?q=stars:>10000%20language:javascript&sort=stars`, {
    headers: requestHeaders,
  })
    .then((response) => response.json())
    .then((json) => json.items);
};
