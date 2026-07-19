import { useNavigate, useParams } from "react-router";
import BoardLayout from "../layouts/BoardLayout";
import { useBoardById } from "../hooks/api/boards/useBoardById";
import { routes } from "../constants/routes";
import { useBoardColumnsList } from "../hooks/api/columns/useBoardColumnsList";
import ColumnSkeleton from "../components/Column/ColumnSkeleton";
import { useSetColumns, useSetTasksByColumn } from "../store/kanban/selectors";
import React from "react";
import { useGetAllTasks } from "../hooks/api/tasks/useGetAllTasks";
import EditableText from "@/components/EditableText";
import { useUpdateBoard } from "@/hooks/api/boards/useUpdateBoard";
import { cn } from "@/lib/utils";
import Button from "@/components/Button";
import { MoreHorizontal, TrashIcon } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDeleteBoard } from "@/hooks/api/boards/useDeleteBoard";
import toast from "react-hot-toast";
import Dropdown from "@/components/Dropdown";

function BoardPage() {
  const params = useParams();
  const navigate = useNavigate();
  const setColumns = useSetColumns();
  const setTasksByColumn = useSetTasksByColumn();
  const [openDeleteBoardModal, setOpenDeleteBoardModal] = React.useState(false);

  const boardId = params.id!;

  const [isEditableTitle, setIsEditableTitle] = React.useState(false);

  const {
    data: boardData,
    error: boardByIdError,
    isLoading: isLoadingBoard,
  } = useBoardById(params.id!);

  const updateBoard = useUpdateBoard();
  const deleteBoard = useDeleteBoard();

  const { data: tasks, isLoading: isLoadingTasks } = useGetAllTasks(boardId);

  const { data: columns = [], isLoading: isLoadingColumns } =
    useBoardColumnsList(boardId);

  React.useEffect(() => {
    if (tasks) {
      setTasksByColumn(tasks);
    }

    return () => {
      setTasksByColumn([]);
    };
  }, [tasks, setTasksByColumn]);

  React.useEffect(() => {
    if (columns.length > 0) {
      setColumns(columns);
    }

    return () => {
      setColumns([]);
    };
  }, [columns, setColumns]);

  const onUpdateBoard = ({ title }: { title: string }) => {
    if (title.trim() !== "") {
      updateBoard.mutate({ boardId, dto: { title: title } });
    }
  };

  const onDeleteBoard = () => {
    deleteBoard.mutate(boardId, {
      onSuccess: () => {
        navigate(routes.home);
        if (boardData?.board.title) {
          toast.success(`Board "${boardData?.board.title}" removed.`);
        }
      },
    });
  };

  if (isLoadingBoard || isLoadingColumns || isLoadingTasks) {
    return (
      <div className="pt-4 pb-4">
        <div className="px-7 skeleton h-7 w-32 mb-3"></div>
        <div className="flex gap-4">
          <ColumnSkeleton />
          <ColumnSkeleton />
          <ColumnSkeleton />
          <ColumnSkeleton />
        </div>
      </div>
    );
  }

  if (boardByIdError) {
    navigate(routes.home);
  } else if (boardData) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col gap-3">
        <div className="h-14 flex items-center justify-between px-7 bg-black/25">
          <div>
            <EditableText
              containerClassName={cn("min-w-60 px-3!", {
                "hover:bg-white/10 rounded-md whitespace-nowrap truncate":
                  !isEditableTitle,
              })}
              inputClassName="min-w-60"
              isEditable={isEditableTitle}
              setIsEditable={setIsEditableTitle}
              onSave={(title) => onUpdateBoard({ title })}
              text={boardData.board.title}
              disabled={updateBoard.isPending}
            />
          </div>

          <div className="grow flex gap-3 justify-end">
            <Dropdown
              triggerRender={
                <Button className="rounded-full" isIconOnly>
                  <MoreHorizontal />
                </Button>
              }
            >
              <DropdownMenuItem
                onClick={() => setOpenDeleteBoardModal(true)}
                className="text-red-500 hover:text-red-500! flex gap-3 items-center!"
              >
                <TrashIcon className="size-4" />
                <p className="leading-0">Delete board</p>
              </DropdownMenuItem>
            </Dropdown>
          </div>
        </div>
        <BoardLayout boardId={boardId} />

        <Dialog
          open={openDeleteBoardModal}
          onOpenChange={(o) => !o && setOpenDeleteBoardModal(false)}
        >
          <DialogContent className="bg-gray-charcoal">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete board "{boardData.board.title}"?
            </h2>
            <div className="flex justify-end gap-2">
              <Button
                onClick={onDeleteBoard}
                variant="default"
                className="bg-red-500 hover:bg-red-600!"
              >
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => setOpenDeleteBoardModal(false)}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default BoardPage;
