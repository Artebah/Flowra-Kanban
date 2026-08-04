import { ChevronDown, UserRoundPlusIcon, XIcon } from "lucide-react";
import Button from "../Button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import React from "react";
import Input from "../Input";
import type { User } from "@/types/api/auth";
import { Select, SelectContent, SelectTrigger, SelectItem } from "../ui/select";
import { BoardRole } from "@/types/api/boards";
import { cn } from "@/lib/utils";
import BoardMemberItem from "./BoardMemberItem";
import { useAddBoardMember } from "@/hooks/api/boards/useAddBoardMember";
import { useParams } from "react-router";
import { useGetBoardMembers } from "@/hooks/api/boards/useGetBoardMembers";
import toast from "react-hot-toast";

const availableUsers: User[] = [
  {
    id: "6e6f0d64-aba4-4ca1-b589-030dcf2b1352",
    email: "alex.smith@example.com",
    username: "alex_smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    isProfileCompleted: true,
    createdAt: "2024-01-15T08:30:00Z",
    updatedAt: "2024-06-10T11:20:00Z",
  },
  {
    id: "801ef824-7ada-41e6-a27b-a3eedaba810f",
    email: "marta.k@example.com",
    username: "marta_k",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marta",
    isProfileCompleted: true,
    createdAt: "2024-02-20T14:15:00Z",
    updatedAt: "2024-05-01T09:45:00Z",
  },
  {
    id: "4b2ee03f-c766-4e18-a823-872e219a4611",
    email: "dev.user@example.com",
    isProfileCompleted: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=z9gdlwrm",
    username: "dev.user",
    createdAt: "2024-07-01T10:00:00Z",
    updatedAt: "2024-07-01T10:00:00Z",
  },
];

function ShareBoardModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<BoardRole>(
    BoardRole.MEMBER
  );
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [showUsersList, setShowUsersList] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { boardId } = useParams();

  const addBoardMember = useAddBoardMember();
  const { data: boardMembers = [] } = useGetBoardMembers({ boardId });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => clearTimeout(timer);
  }, [search]);

  //React.useEffect(() => {}, [debouncedSearch]);

  const onSubmit = () => {
    if (selectedRole && selectedUser && boardId) {
      addBoardMember.mutate(
        {
          boardId,
          dto: { role: selectedRole, userId: selectedUser.id },
        },
        {
          onSuccess: () => {
            setSelectedUser(null);
            setSelectedRole(BoardRole.MEMBER);
          },
          onError: (error) => {
            toast.error("Couldn't add member. " + error.message);
          },
        }
      );
    }
  };

  const onSelectUser = (user: User) => {
    setSelectedUser(user);
    setShowUsersList(false);
    setSearch("");

    inputRef.current?.blur();
  };
  const onClearSelectedUser = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="text-gray-charcoal bg-white/90 hover:text-gray-charcoal hover:bg-white"
      >
        <UserRoundPlusIcon /> Share
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="top-12 translate-y-0 sm:top-20 min-w-[600px]">
          <DialogHeader className="text-lg font-bold">Share board</DialogHeader>
          <div className="flex gap-3">
            <div
              className="grow relative"
              onFocus={() => setShowUsersList(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setShowUsersList(false);
                }
              }}
            >
              <div className="flex items-center border-gray-500 border rounded-sm">
                {selectedUser && (
                  <div
                    onClick={onClearSelectedUser}
                    className="cursor-pointer rounded-sm bg-white/10 flex gap-1 px-1 ml-3 items-center h-6"
                  >
                    <p className="truncate w-fit max-w-[140px]">
                      {selectedUser.username}
                    </p>
                    <XIcon className="size-4 shrink-0" />
                  </div>
                )}
                <Input
                  ref={inputRef}
                  className="border-0"
                  tabIndex={-1}
                  onFocus={() => setShowUsersList(true)}
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  placeholder="Email adress or name"
                />
              </div>
              <div
                onMouseDown={(e) => e.preventDefault()}
                className={cn(
                  "absolute w-full max-h-48 space-y-2 rounded-[0_0_10px_10px] overflow-y-auto top-11 px-2 py-3 bg-gray-rich transition-all",
                  { "opacity-100 pointer-events-auto": showUsersList },
                  { "opacity-0 pointer-events-none": !showUsersList }
                )}
              >
                {availableUsers.length === 0 && debouncedSearch.trim() && (
                  <div className="h-full flex justify-center items-center">
                    No users found
                  </div>
                )}
                {availableUsers.length === 0 && !debouncedSearch.trim() && (
                  <div className="h-full flex justify-center items-center">
                    Start typing to find user
                  </div>
                )}
                {availableUsers.length > 0 &&
                  availableUsers.map((user) => (
                    <BoardMemberItem
                      key={user.id}
                      onSelectMember={onSelectUser}
                      user={user}
                    />
                  ))}
              </div>
            </div>
            <Select
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as BoardRole)}
            >
              <SelectTrigger
                render={
                  <Button
                    className="h-10! min-w-20 justify-center! capitalize"
                    variant="outline"
                  >
                    {selectedRole} <ChevronDown />
                  </Button>
                }
              />
              <SelectContent side="bottom" alignItemWithTrigger={false}>
                <SelectItem value={BoardRole.MEMBER}>Member</SelectItem>
                <SelectItem value={BoardRole.ADMIN}>Admin</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={onSubmit}
              disabled={!selectedUser || !selectedRole}
              variant="primary"
              className="min-w-20"
            >
              Add
            </Button>
          </div>

          {boardMembers.length > 0 && (
            <div className="space-y-2">
              <p className="text-gray-200 font-bold mb-3">Board members</p>
              {boardMembers.map((boardMember) => (
                <BoardMemberItem
                  key={boardMember.id}
                  user={boardMember}
                  onRemoveMember={() => {}}
                />
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ShareBoardModal;
