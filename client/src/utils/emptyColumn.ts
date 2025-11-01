const emptyPrefix = "EMPTY_";

export const getEmptyColumnIdString = (columnId: string) =>
  emptyPrefix + columnId;
export const getEmptyColumnIdFromString = (str: string) =>
  str.split(emptyPrefix)[1];
