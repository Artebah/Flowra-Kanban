import { useQuery } from "@tanstack/react-query";
import type { ILabel } from "@/types/api/labels";
import { getLabelsList } from "@/services/api/labelsApi";

export const useLabelsList = (boardId: string) => {
  const query = useQuery<ILabel[], Error>({
    queryKey: ["labels-list", boardId],
    queryFn: () => getLabelsList(boardId),
    staleTime: Infinity,
    retry: false,
  });
  return query;
};
