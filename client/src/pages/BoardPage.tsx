import { useNavigate, useParams } from "react-router";
import BoardLayout from "../layouts/BoardLayout";
import { useBoardById } from "../hooks/api/boards/useBoardById";
import { routes } from "../constants/routes";
import { useBoardColumnsList } from "../hooks/api/useBoardColumnsList";
import ColumnSkeleton from "../components/Column/ColumnSkeleton";

function BoardPage() {
  const params = useParams();
  const navigate = useNavigate();

  const boardId = params.id!;

  const {
    data: boardData,
    error: boardByIdError,
    isLoading: isLoadingBoard,
  } = useBoardById(params.id!);
  const { data: columns = [], isLoading: isLoadingColumns } =
    useBoardColumnsList(boardId);

  if (isLoadingBoard || isLoadingColumns) {
    return (
      <div className="px-7 pt-4 pb-4">
        <div className="skeleton h-7 w-32 mb-3"></div>
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
      <div className="px-7 pt-4 pb-4">
        <h1 className="mb-3 text-lg font-bold">{boardData.board.title}</h1>
        <BoardLayout columns={columns} />
      </div>
    );
  }
}

export default BoardPage;
