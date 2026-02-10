import { useNavigate, useParams } from "react-router";
import BoardLayout from "../layouts/BoardLayout";
import { useBoardById } from "../hooks/api/boards/useBoardById";
import { routes } from "../constants/routes";

function BoardPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { data: boardData, error: boardByIdError } = useBoardById(params.id!);

  if (boardByIdError) {
    navigate(routes.home);
  } else if (boardData) {
    return (
      <div className="px-7 pt-4 pb-4">
        <h1 className="mb-3 text-lg font-bold">{boardData.board.title}</h1>
        <BoardLayout boardId={params.id!} />
      </div>
    );
  }
}

export default BoardPage;
