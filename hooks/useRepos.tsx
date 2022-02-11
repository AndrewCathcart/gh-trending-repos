import { GithubRepoSearchRes, Repo } from '@interfaces/repository';
import { buildRepoSearchURL } from '@services/github';
import { getFavouriteRepos } from '@services/localStorage';
import { useEffect, useState } from 'react';

const useRepos = (language: string, page: number) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [hasNext, setHasNext] = useState(true);
  const perPage = 50;

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();

    const searchRepos = async () => {
      const url = buildRepoSearchURL(language, page, perPage);
      const res = await fetch(url, { signal: abortController.signal });
      if (!res.ok) {
        throw new Error('Unable to retrieve trending repositories');
      }
      const data: GithubRepoSearchRes = await res.json();

      const favourites = getFavouriteRepos();
      const repos: Repo[] = data.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          url: item.html_url,
          description: item.description,
          starCount: item.stargazers_count,
          isFavourite: favourites[item.id] ? true : false,
        };
      });

      setHasNext(data.total_count / perPage > page);
      setRepos(repos);
      setIsLoading(false);
      setError('');
    };

    searchRepos().catch((err) => {
      if (err.name !== 'AbortError') {
        setIsLoading(false);
        setError(err.message);
      }
    });

    return () => abortController.abort();
  }, [language, page]);

  return { isLoading, error, repos, setRepos, hasNext };
};

export default useRepos;
