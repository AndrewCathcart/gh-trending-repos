import { calculateLastWeek } from './date';

describe('date', () => {
  describe('calculateLastWeek', () => {
    it('should return last week in ISO format', () => {
      jest.spyOn(global.Date, 'now').mockImplementationOnce(() => {
        return new Date('2021-01-01').valueOf();
      });
      expect(calculateLastWeek()).toEqual('2020-12-25T00:00:00.000Z');
    });
  });
});
