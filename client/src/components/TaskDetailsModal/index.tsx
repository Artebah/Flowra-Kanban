import {
  ClockIcon,
  PaperclipIcon,
  TextIcon,
  UserRoundPlusIcon,
  XIcon,
} from "lucide-react";
import Button from "../Button";
import Modal from "../Modal";
import {
  useModalDetailsData,
  useUpdateModalDetailsData,
} from "../../store/kanban/selectors";
import { useGetTaskDetails } from "../../hooks/api/tasks/useGetTaskDetails";
import TaskDescriptionEditor from "../TaskDescriptionEditor";
import TaskDetailsHeader from "./TaskDetailsHeader";
import LabelDropdown from "../LabelDropdown";

function TaskDetailsModal() {
  const modalDetailsData = useModalDetailsData();
  const updateModalDetailsData = useUpdateModalDetailsData();
  const { data: taskDetails } = useGetTaskDetails({
    boardId: modalDetailsData.boardId || "",
    taskId: modalDetailsData.taskId || "",
  });

  const onCloseModal = () => {
    updateModalDetailsData({ boardId: null, taskId: null, isOpen: false });
  };

  if (!taskDetails) {
    return null;
  }

  return (
    <Modal
      className="flex flex-col px-0 py-0 max-h-[calc(100vh-5rem)] max-w-[620px] top-0! overflow-y-hidden"
      backdropClassName="pt-16 items-start"
      onClose={onCloseModal}
      open={modalDetailsData.isOpen}
    >
      <div className="flex justify-between basis-16 shrink-0 items-center border-b border-gray-400 px-6">
        <span className="py-1 px-3 bg-gray-600 rounded-md">
          {taskDetails.column.title}
        </span>
        <div>
          <Button onClick={onCloseModal} className="size-10" isIconOnly>
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

          <LabelDropdown />

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

        <div className="px-6 mt-8 pb-8">
          <div className="flex gap-3">
            <TextIcon /> <p className="font-bold">Description</p>
          </div>
          {modalDetailsData.boardId && modalDetailsData.taskId && (
            <div className="ml-8 mt-3">
              <TaskDescriptionEditor
                boardId={modalDetailsData.boardId}
                taskId={modalDetailsData.taskId}
                initialContent={taskDetails.descriptionContent || {}}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default TaskDetailsModal;
