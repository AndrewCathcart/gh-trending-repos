import useFavourites from '@hooks/useFavourites';
import useRepos from '@hooks/useRepos';
import { Repo } from '@interfaces/repository';
import { useState } from 'react';
import LanguageFilter from './LanguageFilter';
import PaginationButtons from './PaginationButtons';
import RepoCard from './RepoCard';
import Spinner from './Spinner';

const RepoCardList = () => {
  const [language, setLanguage] = useState('Any Language');
  const [page, setPage] = useState(1);
  const { isLoading, error, repos, setRepos, hasNext } = useRepos(language, page);
  const { persistFavourites } = useFavourites();

  const toggleFavourite = (item: Repo) => {
    const newRepos = repos.map((repo) => {
      if (repo.id === item.id) {
        return {
          ...repo,
          isFavourite: !item.isFavourite,
        };
      }
      return repo;
    });
    setRepos(newRepos);
    persistFavourites(item);
  };

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return <Spinner />;
  }

  // could have used something like a toast, but just doing this for now.
  if (error) {
    return <div> An error occurred. </div>;
  }

  // could probably return something better but this will do for now.
  if (repos.length === 0) {
    return <div> Could not find any repos. </div>;
  }

  return (
    <div>
      <LanguageFilter selected={language} setLanguage={handleLanguageChange} />
      <ul id="repos">
        {repos.map((repo, idx) => (
          <li key={repo.id} data-testid={`repo-${idx}`}>
            <RepoCard item={repo} toggleFavourite={toggleFavourite} />
          </li>
        ))}
      </ul>
      <PaginationButtons page={page} handleChange={handlePageChange} hasNext={hasNext} />
    </div>
  );
};

export default RepoCardList;
