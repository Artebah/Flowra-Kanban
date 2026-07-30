import { useQuery } from "@tanstack/react-query";
import type { ILabel } from "@/types/api/labels";
import { getLabelsList } from "@/services/api/labelsApi";

interface UseLabelListOptions {
  boardId: string | null;
}

export const useLabelsList = ({ boardId }: UseLabelListOptions) => {
  return useQuery<ILabel[], Error>({
    queryKey: ["labels-list", boardId],
    queryFn: () => getLabelsList({ boardId: boardId! }),
    enabled: boardId !== null,
    staleTime: Infinity,
    retry: false,
  });
};
