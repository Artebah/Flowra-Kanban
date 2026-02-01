import { useNavigate, useParams } from "react-router";
import BoardLayout from "../layouts/BoardLayout";
import { useBoardById } from "../hooks/api/boards/useBoardById";
import { routes } from "../constants/routes";

function BoardPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { data, error } = useBoardById(params.id!);

  if (error) {
    navigate(routes.home);
  } else if (data) {
    return (
      <div className="px-7 pt-4 pb-4">
        <h1 className="mb-3 text-2xl">{data.board.title}</h1>
        <BoardLayout />
      </div>
    );
  }
}

export default BoardPage;
