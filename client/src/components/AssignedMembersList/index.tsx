import type { User } from "@/types/api/auth";
import MembersDropdown from "../MembersDropdown";
import Button from "../Button";
import { Plus } from "lucide-react";

interface AssignedMembersListProps {
  members: User[];
}

function AssignedMembersList({ members }: AssignedMembersListProps) {
  return (
    <div className="px-6 my-8">
      <p className="font-bold mb-2 text-gray-300">Labels</p>

      <div className="flex gap-1.5">
        {members.map((member) => (
          <div className="size-10" key={member.id}>
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
            <Button variant="outline" isIconOnly>
              <Plus />
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default AssignedMembersList;
