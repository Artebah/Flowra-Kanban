import { ChevronDown, UserRoundPlusIcon } from "lucide-react";
import Button from "../Button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import React from "react";
import Input from "../Input";
import type { User } from "@/types/api/auth";
import { Select, SelectContent, SelectTrigger, SelectItem } from "../ui/select";
import { BoardRole } from "@/types/api/boards";

const availableUsers: User[] = [
  {
    id: "1",
    email: "alex.smith@example.com",
    username: "alex_smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    isProfileCompleted: true,
    createdAt: "2024-01-15T08:30:00Z",
    updatedAt: "2024-06-10T11:20:00Z",
  },
  {
    id: "2",
    email: "marta.k@example.com",
    username: "marta_k",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marta",
    isProfileCompleted: true,
    createdAt: "2024-02-20T14:15:00Z",
    updatedAt: "2024-05-01T09:45:00Z",
  },
  {
    id: "3",
    email: "dev.user@example.com",
    isProfileCompleted: false,
    createdAt: "2024-07-01T10:00:00Z",
    updatedAt: "2024-07-01T10:00:00Z",
  },
];

function ShareBoardModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<BoardRole>(
    BoardRole.MEMBER
  );
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => clearTimeout(timer);
  }, [search]);

  React.useEffect(() => {}, [debouncedSearch]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="text-gray-charcoal bg-white/90 hover:text-gray-charcoal hover:bg-white"
      >
        <UserRoundPlusIcon /> Share
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="top-12 translate-y-0 sm:top-20 min-w-[500px]">
          <DialogHeader className="text-lg font-bold">Share board</DialogHeader>
          <div className="flex gap-3">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="grow"
              placeholder="Email adress or name"
            />
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
            <Button variant="primary" className="min-w-20">
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ShareBoardModal;
