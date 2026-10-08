export const objectUtils = {
  /**
   * Returns a new object containing only the specified keys
   */
  pick: <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> =>
    keys.reduce(
      (result, key) => {
        if (key in obj) result[key] = obj[key];
        return result;
      },
      {} as Pick<T, K>
    ),

  /**
   * Returns a new object without the specified keys
   */
  omit: <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach((key) => delete result[key]);
    return result;
  },

  /**
   * Checks if an object has no own properties
   */
  isEmpty: (obj: object): boolean => Object.keys(obj).length === 0,

  /**
   * Checks if two objects are equal by comparing their JSON strings
   */
  isEqual: (obj1: unknown, obj2: unknown): boolean => {
    if (
      typeof obj1 === "object" &&
      obj1 !== null &&
      typeof obj2 === "object" &&
      obj2 !== null
    ) {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    return false;
  },
};
