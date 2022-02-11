import { FavouriteReposMap } from '@interfaces/repository';

const FAVOURITE_REPOS_KEY = 'favourite-repos';
export const getFavouriteRepos = (): FavouriteReposMap => {
  const storedFavs = localStorage.getItem(FAVOURITE_REPOS_KEY);
  return storedFavs ? JSON.parse(storedFavs) : {};
};

export const saveFavouriteRepos = (favourites: FavouriteReposMap) => {
  localStorage.setItem(FAVOURITE_REPOS_KEY, JSON.stringify(favourites));
};
