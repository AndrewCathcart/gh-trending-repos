const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

export const calculateLastWeek = () => {
  const now = Date.now();
  const lastWeek = new Date(now - ONE_WEEK);
  return lastWeek.toISOString();
};
