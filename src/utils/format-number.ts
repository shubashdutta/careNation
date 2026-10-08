/**
 * Format number with commas
 */
export const formatNumber = (num: number) => {
  return num.toLocaleString();
};

/**
 * Generate a random ID
 */
export const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 10);
};
