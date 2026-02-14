function ColumnSkeleton() {
  const taskCount = 3;

  return (
    <div className="bg-gray-charcoal/50 py-3 px-3 rounded-xl max-w-[300px] w-full flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="skeleton h-6 w-32"></div>
        <div className="skeleton h-8 w-8 rounded-lg"></div>
      </div>

      <div className="flex flex-col gap-3 min-h-28">
        {Array.from({ length: taskCount }).map((_, index) => (
          <div
            key={index}
            className="skeleton h-20 w-full rounded-lg bg-white/5"
          ></div>
        ))}
      </div>

      <div className="skeleton h-10 w-full mt-2 rounded-lg"></div>
    </div>
  );
}

export default ColumnSkeleton;
