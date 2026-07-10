import { useQuery } from "@tanstack/react-query";
import type { ILabel } from "@/types/api/labels";
import { getLabelsList } from "@/services/api/labelsApi";

export const useLabelsList = () => {
  const query = useQuery<ILabel[], Error>({
    queryKey: ["labels-list"],
    queryFn: getLabelsList,
    staleTime: Infinity,
    retry: false,
  });
  return query;
};
