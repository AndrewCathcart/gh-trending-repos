import { FavouriteReposMap } from '@interfaces/repository';
import { getFavouriteRepos, saveFavouriteRepos } from './localStorage';

describe('localStorage', () => {
  const fakeFavouriteReposMap: FavouriteReposMap = {
    '123': {
      id: '123',
      description: 'fake desc',
      name: 'fake name',
      starCount: 1,
      url: 'https://test.com',
      isFavourite: true,
    },
  };

  describe('getFavouriteRepos', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');

    it('returns {} if not in local storage', () => {
      getItemSpy.mockReturnValueOnce(null);
      const actual = getFavouriteRepos();
      expect(actual).toEqual({});
    });

    it('returns the FavouriteReposMap if it exists in local storage', () => {
      getItemSpy.mockReturnValueOnce(JSON.stringify(fakeFavouriteReposMap));
      const actual = getFavouriteRepos();
      expect(actual).toEqual(fakeFavouriteReposMap);
    });
  });

  describe('saveFavouriteRepos', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    it('calls localStorage.setItem with the stringified FavouriteReposMap', () => {
      saveFavouriteRepos(fakeFavouriteReposMap);
      expect(setItemSpy).toHaveBeenCalledWith('favourite-repos', JSON.stringify(fakeFavouriteReposMap));
    });
  });
});
