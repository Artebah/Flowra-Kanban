import BoardsListItem from "./BoardsListItem";
import { useBoardsList } from "../../hooks/api/boards/useBoardsList";

function BoardsList() {
  const { data: boardsList, isLoading } = useBoardsList();

  return (
    <div>
      {isLoading && <div>loading...</div>}
      <div className="bg-gray-charcoal p-4 grid grid-cols-4 gap-4">
        {boardsList &&
          boardsList.map((board) => (
            <BoardsListItem key={board.id} {...board} />
          ))}
      </div>
      {boardsList && boardsList.length === 0 && <div>No boards found</div>}
      {!boardsList && <div>Couldn't fetch your boards</div>}
    </div>
  );
}

export default BoardsList;
