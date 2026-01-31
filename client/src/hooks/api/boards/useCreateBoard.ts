import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateBoardDto, IBoard } from "../../../types/api/boards";
import { createBoard } from "../../../services/api/boardsApi";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  const query = useMutation<IBoard, Error, CreateBoardDto>({
    mutationFn: (createBoardDto) => createBoard(createBoardDto),
    onSuccess: (createBoardRes) => {
      queryClient.invalidateQueries({ queryKey: ["boards-list-by-user"] });
      console.log(createBoardRes);
    },
  });

  return query;
};
