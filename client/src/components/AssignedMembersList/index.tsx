import type { User } from "@/types/api/auth";
import MembersDropdown from "../MembersDropdown";
import Button from "../Button";
import { Plus } from "lucide-react";

interface AssignedMembersListProps {
  members: User[];
}

function AssignedMembersList({ members }: AssignedMembersListProps) {
  return (
    <div>
      <p className="font-medium text-xs mb-2 text-gray-300">Members</p>

      <div className="flex flex-wrap gap-1.5">
        {members.map((member) => (
          <div className="size-8" key={member.id}>
            <img
              title={`${member.email} (${member.username})`}
              className="size-full rounded-full object-cover"
              src="/avatar_1.jpg"
              alt={member.username}
            />
          </div>
        ))}
        <MembersDropdown
          triggerRender={
            <Button
              variant="outline"
              className="rounded-full size-8"
              isIconOnly
            >
              <Plus className="size-5" />
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default AssignedMembersList;
