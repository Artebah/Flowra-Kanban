import React from "react";
import { mockedTasks } from "../mock/tasks";
import { useSetTasks } from "../store/kanban/selectors";

export function useFetchTasks() {
  const setTasks = useSetTasks();

  React.useEffect(() => {
    setTasks(mockedTasks);
  }, [setTasks]);
}
