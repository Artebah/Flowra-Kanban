import {
  ChevronDown,
  Loader2Icon,
  UserRoundPlusIcon,
  XIcon,
} from "lucide-react";
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
import { useGetAllUsers } from "@/hooks/api/users/useGetAllUsers";
import { useDeleteBoardMember } from "@/hooks/api/boards/useDeleteBoardMember";
import { useUser } from "@/store/auth/selectors";

function ShareBoardModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<BoardRole>(
    BoardRole.MEMBER
  );
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [showUsersList, setShowUsersList] = React.useState(false);
  const {
    refetch: refetchAllUsers,
    data: allUsers = [],
    isFetching: isLoadingAllUsers,
  } = useGetAllUsers({
    search: debouncedSearch,
  });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const user = useUser();

  const { boardId } = useParams();

  const addBoardMember = useAddBoardMember();
  const { data: boardMembers = [] } = useGetBoardMembers({ boardId });
  const deleteBoardMember = useDeleteBoardMember();

  const filteredUsers = React.useMemo(() => {
    const boardMembersIds = new Set(
      boardMembers.map((member) => member.userId)
    );

    return allUsers.filter((user) => !boardMembersIds.has(user.id));
  }, [allUsers, boardMembers]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => clearTimeout(timer);
  }, [search]);

  React.useEffect(() => {
    refetchAllUsers();
  }, [refetchAllUsers, debouncedSearch]);

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
  const onDeleteBoardMember = (memberId: string) => {
    if (boardId && memberId) {
      deleteBoardMember.mutate({ boardId, memberId });
    }
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
                {filteredUsers.length === 0 && debouncedSearch.trim() && (
                  <div className="h-24 flex justify-center items-center">
                    No users found
                  </div>
                )}
                {isLoadingAllUsers && (
                  <div className="absolute top-0 left-0 bg-black/60 size-full flex justify-center items-center">
                    <Loader2Icon
                      className={`animate-spin text-muted-foreground size-10`}
                    />
                  </div>
                )}
                {filteredUsers.length === 0 && !debouncedSearch.trim() && (
                  <div className="h-24 flex justify-center items-center">
                    Start typing to find user
                  </div>
                )}

                {filteredUsers.length > 0 &&
                  filteredUsers.map((user) => (
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
                  user={boardMember.user}
                  role={boardMember.role}
                  isRemovingMember={deleteBoardMember.isPending}
                  onRemoveMember={
                    user?.id !== boardMember.userId
                      ? () => onDeleteBoardMember(boardMember.userId)
                      : undefined
                  }
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
