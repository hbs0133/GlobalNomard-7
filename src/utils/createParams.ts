const createParams = (
  obj: Record<string, string | number>,
): URLSearchParams => {
  const stringRecord = Object.entries(obj).reduce(
    (acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    },
    {} as Record<string, string>,
  );
  return new URLSearchParams(stringRecord);
};

export default createParams;
