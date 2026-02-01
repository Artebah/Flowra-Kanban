import BoardsListItem from "./BoardsListItem";
import { useBoardsList } from "../../hooks/api/boards/useBoardsList";
import BoardsListItemSkeleton from "./BoardsListItemSkeleton";

function BoardsList() {
  const { data: boardsList, isLoading } = useBoardsList();

  return (
    <div className="bg-gray-charcoal p-4 ">
      {isLoading && (
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <BoardsListItemSkeleton key={num} />
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {boardsList &&
          boardsList.map((board) => (
            <BoardsListItem key={board.id} {...board} />
          ))}
      </div>
      {boardsList && boardsList.length === 0 && (
        <div className="py-8 text-center">No boards found</div>
      )}
      {!isLoading && !boardsList && (
        <div className="py-8 text-center">Couldn't fetch your boards</div>
      )}
    </div>
  );
}

export default BoardsList;
