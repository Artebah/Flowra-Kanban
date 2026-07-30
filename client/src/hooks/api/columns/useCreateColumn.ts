import { useMutation } from "@tanstack/react-query";
import type {
  BoardColumn,
  CreateColumnOptions,
} from "../../../types/api/columns";
import { createColumn } from "../../../services/api/columnsApi";

export const useCreateColumn = () => {
  return useMutation<BoardColumn, Error, CreateColumnOptions>({
    mutationFn: createColumn,
  });
};
