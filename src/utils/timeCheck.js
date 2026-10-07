export const isWithinTime = () => {
  const now = new Date();

  const start = new Date();
  start.setHours(7, 0, 0);

  const end = new Date();
  end.setHours(9, 30, 0);

  return now >= start && now <= end;
};