import {
  ClockIcon,
  PaperclipIcon,
  TagIcon,
  TextIcon,
  UserRoundPlusIcon,
  XIcon,
} from "lucide-react";
import Button from "../Button";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  useModalDetailsData,
  useUpdateModalDetailsData,
} from "../../store/kanban/selectors";
import { useGetTaskDetails } from "../../hooks/api/tasks/useGetTaskDetails";
import TaskDescriptionEditor from "../TaskDescriptionEditor";
import TaskDetailsHeader from "./TaskDetailsHeader";
import LabelDropdown from "../LabelDropdown";
import TaskDetailsActions from "./TaskDetailsActions";
import { useGetAssignedLabels } from "@/hooks/api/labels/useGetAssignedLabels";
import AssignedLabelsList from "../LabelDropdown/AssignedLabelsList";

function TaskDetailsModal() {
  const modalDetailsData = useModalDetailsData();
  const updateModalDetailsData = useUpdateModalDetailsData();
  const { data: taskDetails } = useGetTaskDetails({
    boardId: modalDetailsData.boardId || "",
    taskId: modalDetailsData.taskId || "",
  });

  const { data: assignedLabels = [], isLoading: isLoadingAssignedLabels } =
    useGetAssignedLabels(modalDetailsData.boardId, modalDetailsData.taskId);

  const onCloseModal = () => {
    updateModalDetailsData({ boardId: null, taskId: null, isOpen: false });
  };

  if (!taskDetails) {
    return null;
  }

  return (
    <Dialog
      open={modalDetailsData.isOpen}
      onOpenChange={(o) => !o && onCloseModal()}
    >
      <DialogContent
        showCloseButton={false}
        className="flex flex-col px-0 py-0 max-h-[calc(100vh-5rem)] md:min-w-[620px] min-w-[96vw] overflow-y-hidden top-16! translate-y-0!"
      >
        <div className="flex justify-between basis-16 shrink-0 items-center border-b border-gray-400 px-6">
          <span className="py-1 px-3 bg-dropdown-bg rounded-md">
            {taskDetails.column.title}
          </span>
          <div className="flex items-center gap-3">
            <TaskDetailsActions taskDetails={taskDetails} />

            <Button
              onClick={onCloseModal}
              className="rounded-full size-10"
              isIconOnly
            >
              <XIcon />
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto">
          {modalDetailsData.boardId && modalDetailsData.taskId && (
            <TaskDetailsHeader
              boardId={modalDetailsData.boardId}
              taskId={modalDetailsData.taskId}
              taskDetails={taskDetails}
            />
          )}

          <div className="px-6 ml-9 flex gap-3 mt-5">
            <Button
              leadingIcon={<PaperclipIcon className="size-4" />}
              variant="outline"
              className="h-8 px-2"
            >
              Attachment
            </Button>

            <LabelDropdown
              TriggerComponent={
                <Button
                  leadingIcon={<TagIcon className="size-4" />}
                  variant="outline"
                  className="h-8 px-2"
                >
                  Labels
                </Button>
              }
            />

            <Button
              leadingIcon={<ClockIcon className="size-4" />}
              variant="outline"
              className="h-8 px-2"
            >
              Deadlines
            </Button>
            <Button
              leadingIcon={<UserRoundPlusIcon className="size-4" />}
              variant="outline"
              className="h-8 px-2"
            >
              Members
            </Button>
          </div>

          {!isLoadingAssignedLabels && assignedLabels.length > 0 && (
            <AssignedLabelsList labels={assignedLabels} />
          )}
          <div className="px-6 mt-8 pb-8">
            <div className="flex gap-3">
              <TextIcon /> <p className="font-bold">Description</p>
            </div>
            {modalDetailsData.boardId && modalDetailsData.taskId && (
              <div className="ml-8 mt-3">
                <TaskDescriptionEditor
                  boardId={modalDetailsData.boardId}
                  taskId={modalDetailsData.taskId}
                  initialContent={taskDetails.descriptionContent || null}
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailsModal;
