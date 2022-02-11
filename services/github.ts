import { calculateLastWeek } from './date';

export const buildRepoSearchURL = (language: string, pageNum: number, perPage: number) => {
  const languageFilter = language && language !== 'Any Language' ? `language:${language}+` : '';
  const lastWeek = calculateLastWeek();

  return `https://api.github.com/search/repositories?q=${languageFilter}created:%3E${lastWeek}&sort=stars&order=desc&page=${pageNum}&per_page=${perPage}`;
};
