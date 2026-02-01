function BoardsListItemSkeleton() {
  return (
    <div className="card bg-gray-dim max-w-96 shadow-sm">
      <div className="skeleton rounded-none h-48"></div>
      <div className="card-body">
        <div className="skeleton h-7 max-w-50"></div>
        <div className="skeleton h-4 max-w-16"></div>
      </div>
    </div>
  );
}

export default BoardsListItemSkeleton;
