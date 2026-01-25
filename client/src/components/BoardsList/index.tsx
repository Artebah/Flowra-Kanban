import BoardsListItem from "./BoardsListItem";
import { useBoardsList } from "../../hooks/api/boards/useBoardsList";

function BoardsList() {
  const { data: boardsList, isLoading } = useBoardsList();

  return (
    <div>
      {isLoading && <div>loading...</div>}
      {boardsList &&
        boardsList.map((board) => <BoardsListItem key={board.id} {...board} />)}
      {boardsList && boardsList.length === 0 && <div>No boards found</div>}
      {!boardsList && <div>Couldn't fetch your boards</div>}
    </div>
  );
}

export default BoardsList;
