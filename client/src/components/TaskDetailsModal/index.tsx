import {
  ClockIcon,
  PaperclipIcon,
  TagIcon,
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
import DatesDropdown from "../DatesDropdown";
import MembersDropdown from "../MembersDropdown";
import { useGetAssignedMembers } from "@/hooks/api/tasks/useGetAssignedMembers";
import AssignedMembersList from "../AssignedMembersList";
import AssignedDueDateDropdown from "../AssignedDueDateDropdown";

function TaskDetailsModal() {
  const modalDetailsData = useModalDetailsData();
  const updateModalDetailsData = useUpdateModalDetailsData();
  const { data: taskDetails } = useGetTaskDetails({
    boardId: modalDetailsData.boardId || "",
    taskId: modalDetailsData.taskId || "",
  });

  const { data: assignedLabels = [], isLoading: isLoadingAssignedLabels } =
    useGetAssignedLabels(modalDetailsData.boardId, modalDetailsData.taskId);
  const { data: assignedMembers = [], isLoading: isLoadingAssignedMembers } =
    useGetAssignedMembers(modalDetailsData.boardId, modalDetailsData.taskId);

  const onCloseModal = () => {
    updateModalDetailsData({ boardId: null, taskId: null, isOpen: false });
  };

  const showAssignedLabels =
    !isLoadingAssignedLabels && assignedLabels.length > 0;

  const showAssignedMembers =
    !isLoadingAssignedMembers && assignedMembers.length > 0;

  const showDueDate = taskDetails?.dueDate;

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
        className="top-16! flex max-h-[calc(100vh-5rem)] min-w-[96vw] translate-y-0! flex-col overflow-y-hidden px-0 py-0 md:min-w-[620px]"
      >
        <div className="flex shrink-0 basis-16 items-center justify-between border-b border-gray-400 px-6">
          <span className="bg-dropdown-bg rounded-md px-3 py-1">
            {taskDetails.column.title}
          </span>
          <div className="flex items-center gap-3">
            <TaskDetailsActions taskDetails={taskDetails} />

            <Button
              onClick={onCloseModal}
              className="size-10 rounded-full"
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

          <div className="mt-5 ml-9 flex gap-3 px-6">
            <Button
              leadingIcon={<PaperclipIcon className="size-4" />}
              variant="outline"
              className="h-8 px-2"
            >
              Attachment
            </Button>

            <LabelDropdown
              triggerRender={
                <Button
                  leadingIcon={<TagIcon className="size-4" />}
                  variant="outline"
                  className="h-8 px-2"
                >
                  Labels
                </Button>
              }
            />

            <DatesDropdown
              taskDetails={taskDetails}
              triggerRender={
                <Button
                  leadingIcon={<ClockIcon className="size-4" />}
                  variant="outline"
                  className="h-8 px-2"
                >
                  Dates
                </Button>
              }
            />

            <MembersDropdown
              triggerRender={
                <Button
                  leadingIcon={<UserRoundPlusIcon className="size-4" />}
                  variant="outline"
                  className="h-8 px-2"
                >
                  Members
                </Button>
              }
            />
          </div>

          {(showAssignedLabels || showAssignedMembers || showDueDate) && (
            <div className="px-8 my-10 flex flex-wrap gap-x-5 gap-y-3">
              {showAssignedMembers && (
                <AssignedMembersList members={assignedMembers} />
              )}

              {showAssignedLabels && (
                <AssignedLabelsList labels={assignedLabels} />
              )}

              {taskDetails.dueDate && (
                <AssignedDueDateDropdown
                  taskDetails={taskDetails}
                  dueDateString={taskDetails.dueDate}
                />
              )}
            </div>
          )}

          {modalDetailsData.boardId && modalDetailsData.taskId && (
            <TaskDescriptionEditor
              boardId={modalDetailsData.boardId}
              taskId={modalDetailsData.taskId}
              initialContent={taskDetails.descriptionContent || null}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailsModal;
