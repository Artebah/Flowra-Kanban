import React from "react";
import Popover from "../Popover";
import { useGetAssignedMembers } from "@/hooks/api/tasks/useGetAssignedMembers";
import { useModalDetailsData } from "@/store/kanban/selectors";
import Button from "../Button";
import { XIcon } from "lucide-react";
import { useGetBoardMembers } from "@/hooks/api/boards/useGetBoardMembers";
import { useAssignMembers } from "@/hooks/api/tasks/useAssignMembers";

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
  const assignMembers = useAssignMembers();

  const onClickMember = (memberId: string) => {
    if (!boardId || !taskId) return;

    const ids = assignedMembers.map((assignedMember) => assignedMember.id);
    const isAssigned = ids.includes(memberId);

    const membersIds = isAssigned
      ? ids.filter((id) => id !== memberId)
      : [...ids, memberId];

    assignMembers.mutate({ boardId, taskId, dto: { membersIds } });
  };

  return (
    <Popover title="Members" triggerRender={triggerRender}>
      {boardMembers.map((boardMember) => (
        <Button
          disabled={assignMembers.isPending}
          onClick={() => onClickMember(boardMember.id)}
        >
          <div className="grow flex items-center gap-3">
            <div className="size-8 rounded-full overflow-hidden">
              <img
                className="size-full object-cover"
                src={boardMember.avatar}
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
