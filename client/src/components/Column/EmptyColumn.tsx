import { useDroppable } from "@dnd-kit/core";
import { getEmptyColumnIdString } from "../../utils/emptyColumn";

interface EmptyColumnProps {
  columnId: string;
  isEndDroppable?: boolean;
}

function EmptyColumn({ columnId, isEndDroppable }: EmptyColumnProps) {
  const droppableId = isEndDroppable
    ? `end-droppable-${columnId}`
    : getEmptyColumnIdString(columnId);
  const { setNodeRef } = useDroppable({ id: droppableId });

  return (
    <div
      ref={setNodeRef}
      className="flex grow justify-center items-center border-2 border-dashed border-gray-500 rounded-lg mb-3"
    >
      Your list is clear
    </div>
  );
}

export default EmptyColumn;
