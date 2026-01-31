import type { IBoard } from "../../types/api/boards";

interface BoardsListItemProps extends IBoard {}

function BoardsListItem({ createdAt, title }: BoardsListItemProps) {
  return (
    <div className="card bg-base-100 max-w-96 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-xs">{createdAt}</p>
      </div>
    </div>
  );
}

export default BoardsListItem;
