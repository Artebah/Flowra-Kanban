import { Link } from "react-router";
import type { IBoard } from "../../types/api/boards";
import { routes } from "../../constants/routes";

interface BoardsListItemProps extends IBoard {}

function BoardsListItem({ createdAt, title, id }: BoardsListItemProps) {
  return (
    <div className="relative overflow-hidden card bg-gray-dim max-w-96 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5">
      <Link className="absolute z-10 size-full" to={routes.boardById(id)} />
      <figure className="h-48">
        <img
          src="https://i.pinimg.com/736x/c3/c7/71/c3c77155748f15ffee61cbc1fe9705d6.jpg"
          alt={title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title truncate block">{title}</h2>
        <p className="text-xs">{new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default BoardsListItem;
