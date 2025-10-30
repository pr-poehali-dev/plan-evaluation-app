export const calculatePercentage = (fact: number, plan: number): number => {
  if (plan === 0) return 0;
  return (fact / plan) * 100;
};

export const calculateRating = (percentage: number): number => {
  if (percentage <= 10) return 0;
  if (percentage <= 35) return 1;
  if (percentage <= 50) return 2;
  if (percentage <= 65) return 3;
  if (percentage <= 79) return 4;
  return 5;
};

export const getRatingColor = (rating: number): string => {
  const colors = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e'];
  return colors[rating] || '#6b7280';
};
