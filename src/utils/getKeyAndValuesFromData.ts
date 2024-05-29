export const getKeyAndValuesFromData = (
  data: Record<string, string> | undefined
) => {
  if (!data) return [];

  const entries = Object.entries(data);
  const mappedProperties = entries.map((detail) => {
    return { key: detail[0], value: detail[1] };
  });

  return mappedProperties;
};
