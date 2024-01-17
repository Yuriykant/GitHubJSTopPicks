export interface IRepository {
  id: string;
  description?: string;
  name: string;
  owner: {
    login: string;
  };
  homepage?: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}
