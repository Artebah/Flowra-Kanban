import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../../services/api/authApi";
import { useSetUser } from "../../../store/auth/selectors";
import type { User } from "../../../types/api/auth";
import React from "react";

export const useFetchMe = () => {
  const setUser = useSetUser();

  const query = useQuery<User, Error>({
    queryKey: ["authMe"],
    queryFn: fetchMe,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  React.useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  return query;
};
