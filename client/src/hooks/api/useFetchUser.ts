import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../services/api/authApi";
import { useSetUser } from "../../store/auth/selectors";
import type { User } from "../../types/api/auth";
import React from "react";

export const useFetchUser = () => {
  const setUser = useSetUser();

  const query = useQuery<User, Error>({
    queryKey: ["authMe"],
    queryFn: fetchMe,
    staleTime: Infinity,
  });

  React.useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  React.useEffect(() => {
    if (query.error) {
      console.error(query.error.message);
    }
  }, [query.error]);

  return query;
};
