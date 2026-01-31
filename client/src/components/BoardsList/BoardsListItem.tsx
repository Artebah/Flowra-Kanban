import type { IBoard } from "../../types/api/boards";

interface BoardsListItemProps extends IBoard {}

function BoardsListItem({ createdAt, title }: BoardsListItemProps) {
  return (
    <div className="card bg-gray-dim max-w-96 shadow-sm hover:shadow-[0px_0px_10px_5px_#2e2e2e] transition-all hover:-translate-y-0.5">
      <figure>
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
