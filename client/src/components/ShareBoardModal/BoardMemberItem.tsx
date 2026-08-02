import type { User } from "@/types/api/auth";
import { XIcon } from "lucide-react";
import Button from "../Button";
import { cn } from "@/lib/utils";

interface BoardMemberItemProps {
  user: User;
  onSelectMember?: (user: User) => void;
  onRemoveMember?: (user: User) => void;
}

function BoardMemberItem({
  user,
  onSelectMember,
  onRemoveMember,
}: BoardMemberItemProps) {
  return (
    <div
      onClick={onSelectMember ? () => onSelectMember(user) : undefined}
      className={cn(
        "flex gap-3 rounded-sm hover:bg-black/30 py-1 px-3 items-center",
        onSelectMember && "cursor-pointer"
      )}
    >
      <div className="size-8 rounded-full bg-gray-dim overflow-hidden">
        <img src={user.avatar} alt={user.email} />
      </div>
      <div className="grow">
        <p>{user.email}</p>
        <p className="text-gray-500">{user.username}</p>
      </div>
      {onRemoveMember && (
        <Button
          isIconOnly
          className="rounded-full"
          onClick={() => onRemoveMember(user)}
        >
          <XIcon />
        </Button>
      )}
    </div>
  );
}

export default BoardMemberItem;
