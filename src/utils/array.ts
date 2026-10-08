export const arrayUtils = {
  /**
   *    * Returns an array with only unique values, removing duplicates
   */
  unique: <T>(array: T[]): T[] => [...new Set(array)],

  /**
   *  Groups an array of objects by a specified key into an object
   */
  groupBy: <T>(array: T[], key: keyof T): Record<string, T[]> =>
    array.reduce(
      (groups, item) => {
        const groupKey = String(item[key]);
        groups[groupKey] = groups[groupKey] || [];
        groups[groupKey].push(item);
        return groups;
      },
      {} as Record<string, T[]>
    ),

  /**
   * Splits an array into smaller arrays (chunks) of the given size
   **/
  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  /**
   * Randomly shuffles the elements of an array
   */
  shuffle: <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  /**
   * Sorts an array of objects by a specified key in ascending order
   */
  sortBy: <T>(array: T[], key: keyof T): T[] =>
    [...array].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
      return 0;
    }),
};
