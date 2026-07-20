import React from "react";
import Popover from "../Popover";
import { useGetAssignedMembers } from "@/hooks/api/tasks/useGetAssignedMembers";
import { useModalDetailsData } from "@/store/kanban/selectors";
import Button from "../Button";
import { XIcon } from "lucide-react";
import { useGetBoardMembers } from "@/hooks/api/boards/useGetBoardMembers";

interface MembersDropdownProps {
  triggerRender: React.ReactElement;
}

function MembersDropdown({ triggerRender }: MembersDropdownProps) {
  const { boardId, taskId } = useModalDetailsData();

  const { data: assignedMembers = [] } = useGetAssignedMembers(boardId, taskId);
  const { data: boardMembers = [] } = useGetBoardMembers(boardId);
  const getIsAssigned = React.useCallback(
    (memberId: string) =>
      assignedMembers.some((assignedMember) => assignedMember.id === memberId),
    [assignedMembers]
  );

  return (
    <Popover title="Members" triggerRender={triggerRender}>
      {boardMembers.map((boardMember) => (
        <Button>
          <div className="grow flex items-center gap-3">
            <div className="size-8 rounded-full overflow-hidden">
              <img
                className="size-full object-cover"
                src="/avatar_1.jpg"
                alt={boardMember.username}
              />
            </div>

            <span>{boardMember.username}</span>
          </div>
          {getIsAssigned(boardMember.id) && <XIcon className="size-5" />}
        </Button>
      ))}
    </Popover>
  );
}

export default MembersDropdown;
