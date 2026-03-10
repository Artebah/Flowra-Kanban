import { useNavigate, useParams } from "react-router";
import BoardLayout from "../layouts/BoardLayout";
import { useBoardById } from "../hooks/api/boards/useBoardById";
import { routes } from "../constants/routes";
import { useBoardColumnsList } from "../hooks/api/columns/useBoardColumnsList";
import ColumnSkeleton from "../components/Column/ColumnSkeleton";
import { useSetColumns, useSetTasksByColumn } from "../store/kanban/selectors";
import React from "react";
import { useGetAllTasks } from "../hooks/api/tasks/useGetAllTasks";

function BoardPage() {
  const params = useParams();
  const navigate = useNavigate();
  const setColumns = useSetColumns();
  const setTasksByColumn = useSetTasksByColumn();

  const boardId = params.id!;

  const {
    data: boardData,
    error: boardByIdError,
    isLoading: isLoadingBoard,
  } = useBoardById(params.id!);

  const { data: tasks, isLoading: isLoadingTasks } = useGetAllTasks(boardId);

  const { data: columns = [], isLoading: isLoadingColumns } =
    useBoardColumnsList(boardId);

  React.useEffect(() => {
    if (tasks) {
      setTasksByColumn(tasks);
    }
  }, [tasks, setTasksByColumn]);

  React.useEffect(() => {
    if (columns.length > 0) {
      setColumns(columns);
    }
  }, [columns, setColumns]);

  if (isLoadingBoard || isLoadingColumns || isLoadingTasks) {
    return (
      <div className="pt-4 pb-4">
        <div className="px-7 skeleton h-7 w-32 mb-3"></div>
        <div className="flex gap-4">
          <ColumnSkeleton />
          <ColumnSkeleton />
          <ColumnSkeleton />
          <ColumnSkeleton />
        </div>
      </div>
    );
  }

  if (boardByIdError) {
    navigate(routes.home);
  } else if (boardData) {
    return (
      <div className="pt-4 min-h-[calc(100vh-80px)] flex flex-col gap-3">
        <h1 className="px-7 mb-3 text-lg font-bold">{boardData.board.title}</h1>
        <BoardLayout boardId={boardId} />
      </div>
    );
  }
}

export default BoardPage;
