import { calculateLastWeek } from './date';
import { buildRepoSearchURL } from './github';

jest.mock('./date', () => {
  return {
    calculateLastWeek: jest.fn(),
  };
});

describe('github', () => {
  const mockCalculateLastWeek = calculateLastWeek as jest.MockedFunction<typeof calculateLastWeek>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('buildRepoSearchURL', () => {
    const pageNum = 1;
    const perPage = 50;
    const christmasDay = '2020-12-25T00:00:00.000Z';
    mockCalculateLastWeek.mockReturnValue(christmasDay);

    it('builds a url with no language filter if language is empty', () => {
      const language = '';

      const actual = buildRepoSearchURL(language, pageNum, perPage);

      const expected = `https://api.github.com/search/repositories?q=created:%3E${christmasDay}&sort=stars&order=desc&page=${pageNum}&per_page=${perPage}`;
      expect(actual).toEqual(expected);
    });

    it('builds a url with no language filter if language is Any Languages', () => {
      const language = 'Any Language';

      const actual = buildRepoSearchURL(language, pageNum, perPage);

      const expected = `https://api.github.com/search/repositories?q=created:%3E${christmasDay}&sort=stars&order=desc&page=${pageNum}&per_page=${perPage}`;
      expect(actual).toEqual(expected);
    });

    it('builds the url with a language filter', () => {
      const language = 'TypeScript';

      const actual = buildRepoSearchURL(language, pageNum, perPage);

      const expected = `https://api.github.com/search/repositories?q=language:${language}+created:%3E${christmasDay}&sort=stars&order=desc&page=${pageNum}&per_page=${perPage}`;
      expect(actual).toEqual(expected);
    });
  });
});
