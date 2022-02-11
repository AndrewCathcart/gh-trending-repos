export type GithubRepoInfo = {
  id: string;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
};

export type GithubRepoSearchRes = {
  items: GithubRepoInfo[];
  total_count: number;
};

export type Repo = {
  id: string;
  name: string;
  url: string;
  description: string;
  starCount: number;
  isFavourite: boolean;
};

export type FavouriteReposMap = {
  [key: string]: Repo;
};
