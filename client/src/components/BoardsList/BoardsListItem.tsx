import { Link } from "react-router";
import type { IBoard } from "../../types/api/boards";
import { routes } from "../../constants/routes";
import { getRandomInt } from "@/utils/getRandomInt";
import { boardCoverColors } from "@/constants/boardCoverColors";

interface BoardsListItemProps extends IBoard {}

function BoardsListItem({
  createdAt,
  title,
  id,
  coverUrl,
}: BoardsListItemProps) {
  const randomCover = coverUrl
    ? undefined
    : boardCoverColors[getRandomInt(0, boardCoverColors.length - 1)];

  return (
    <div className="relative overflow-hidden card bg-gray-dim max-w-96 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5">
      <Link className="absolute z-10 size-full" to={routes.boardById(id)} />
      {coverUrl ? (
        <figure className="h-48">
          <img className="size-full object-cover" src={coverUrl} alt={title} />
        </figure>
      ) : (
        <div className="w-full h-48" style={{ backgroundColor: randomCover }} />
      )}
      <div className="card-body">
        <h2 className="card-title truncate block">{title}</h2>
        <p className="text-xs">{new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default BoardsListItem;
