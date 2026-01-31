function BoardsListItemSkeleton() {
  return (
    <div className="card bg-base-100 max-w-96 shadow-sm">
      <div className="skeleton h-[190px]"></div>
      <div className="card-body">
        <div className="skeleton h-7 max-w-50"></div>
        <div className="skeleton h-4 max-w-16"></div>
      </div>
    </div>
  );
}

export default BoardsListItemSkeleton;
