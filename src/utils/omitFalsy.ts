export const omitFalsy = (obj: Record<string, any>) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value === null || value === undefined) {
      return acc;
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {});
};
