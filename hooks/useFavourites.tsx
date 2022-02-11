import { FavouriteReposMap, Repo } from '@interfaces/repository';
import { getFavouriteRepos, saveFavouriteRepos } from '@services/localStorage';
import { useEffect, useState } from 'react';

const useFavourites = () => {
  const [favourites, setFavourites] = useState<FavouriteReposMap>({});

  useEffect(() => {
    const favourites = getFavouriteRepos();
    setFavourites(favourites);
  }, []);

  const persistFavourites = (item: Repo) => {
    setFavourites((favourites) => {
      const newFavourites = { ...favourites };
      if (item.isFavourite) {
        delete newFavourites[item.id];
      } else {
        newFavourites[item.id] = { ...item, isFavourite: true };
      }
      saveFavouriteRepos(newFavourites);
      return newFavourites;
    });
  };

  return { favourites, persistFavourites };
};

export default useFavourites;
