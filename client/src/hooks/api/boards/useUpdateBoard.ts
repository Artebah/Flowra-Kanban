import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IBoard, UpdateBoardDto } from "../../../types/api/boards";
import { updateBoard } from "../../../services/api/boardsApi";

interface UpdateBoardVariables {
  boardId: string;
  dto: UpdateBoardDto;
}

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IBoard, Error, UpdateBoardVariables>({
    mutationFn: ({ boardId, dto }) => updateBoard(boardId, dto),
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: ["boards-list-by-user"] });
      queryClient.invalidateQueries({ queryKey: ["board-by-id", boardId] });
    },
  });

  return mutation;
};
