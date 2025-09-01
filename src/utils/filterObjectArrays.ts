export function filterObjectArrays<T extends Record<string, any[]>>(
  obj: T,
  element: any
) {
  const result: Record<string, any[]> = {};

  for (const key in obj) {
    result[key] = obj[key].filter((item) => item !== element);
  }

  return result;
}
