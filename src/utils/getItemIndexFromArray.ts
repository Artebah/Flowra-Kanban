export function getItemIndexFromArray<T extends { id: string }>(
  array: T[],
  id: string
) {
  return array.findIndex((el) => el.id === id);
}
