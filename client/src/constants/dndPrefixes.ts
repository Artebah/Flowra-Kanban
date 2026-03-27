export const END_DROPPABLE_PREFIX = "end-droppable-";
export const SORTABLE_COLUMN_PREFIX = "sortable-column-";
export const EMPTY_COLUMN_PREFIX = "empty-column-";

export const getEndDroppableId = (columnId: string) =>
  `${END_DROPPABLE_PREFIX}${columnId}`;

export const getSortableColumnId = (columnId: string) =>
  `${SORTABLE_COLUMN_PREFIX}${columnId}`;

export const getEmptyColumnIdString = (columnId: string) =>
  `${EMPTY_COLUMN_PREFIX}${columnId}`;

export const getEmptyColumnIdFromString = (str: string) =>
  str.startsWith(EMPTY_COLUMN_PREFIX)
    ? str.slice(EMPTY_COLUMN_PREFIX.length)
    : undefined;

export const getColumnIdFromDroppableId = (id: string) =>
  id.startsWith(EMPTY_COLUMN_PREFIX)
    ? id.slice(EMPTY_COLUMN_PREFIX.length)
    : id.startsWith(END_DROPPABLE_PREFIX)
      ? id.slice(END_DROPPABLE_PREFIX.length)
      : id.startsWith(SORTABLE_COLUMN_PREFIX)
        ? id.slice(SORTABLE_COLUMN_PREFIX.length)
        : undefined;
