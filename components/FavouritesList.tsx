import RepoCard from '@components/RepoCard';
import useFavourites from '@hooks/useFavourites';
import { Repo } from '@interfaces/repository';

const FavouritesList = () => {
  const { favourites, persistFavourites } = useFavourites();

  const toggleFavourite = (item: Repo) => {
    persistFavourites(item);
  };

  if (!Object.values(favourites).length) {
    return <div className="text-center"> Add some favourites first!</div>;
  }

  return (
    <ul id="repos">
      {Object.values(favourites)
        .sort((a, b) => b.starCount - a.starCount)
        .map((repo, idx) => (
          <li key={repo.id} data-testid={`fav-${idx}`}>
            <RepoCard item={repo} toggleFavourite={toggleFavourite} />
          </li>
        ))}
    </ul>
  );
};

export default FavouritesList;
