import {
  ClockIcon,
  PaperclipIcon,
  TagIcon,
  TextIcon,
  UserRoundPlusIcon,
  XIcon,
} from "lucide-react";
import Button from "../Button";
import Modal from "../Modal";
import CompleteCircleCheckbox from "../CompleteCircleCheckbox";
import Textarea from "../Textarea";
import classNames from "classnames";
import React from "react";
import {
  useModalDetailsData,
  useUpdateModalDetailsData,
} from "../../store/kanban/selectors";

function TaskDetailsModal() {
  const [activeDescriptionField, setActiveDescriptionField] =
    React.useState(false);
  const descriptionFieldRef = React.useRef<HTMLTextAreaElement>(null);
  const modalDetailsData = useModalDetailsData();
  const updateModalDetailsData = useUpdateModalDetailsData();

  const onSubmitSavingDescription = () => {
    const descriptionField = descriptionFieldRef.current;

    if (descriptionField) {
      console.log(descriptionField.value);
      setActiveDescriptionField(false);
    }
  };

  const onCloseModal = () => {
    updateModalDetailsData({ columnId: null, isOpen: false });
    setActiveDescriptionField(false);
  };

  return (
    <Modal
      className="flex flex-col px-0 py-0 max-h-[calc(100vh-5rem)] max-w-[620px] !top-0 overflow-y-hidden"
      backdropClassName="pt-16 items-start"
      onClose={onCloseModal}
      open={modalDetailsData.isOpen}
    >
      <div className="flex justify-between basis-16 shrink-0 items-center border-b border-gray-400 px-6">
        <span className="py-1 px-3 bg-gray-600 rounded-md">To-do</span>
        <div>
          <Button className="size-10" isIconOnly>
            <XIcon />
          </Button>
        </div>
      </div>

      <div className="overflow-y-auto">
        <div className="mt-6 px-6">
          <div className="flex items-center gap-4">
            <CompleteCircleCheckbox />
            <h3 className="font-bold text-3xl">Complete my future plans</h3>
          </div>
        </div>

        <div className="px-6 ml-9 flex gap-3 mt-5">
          <Button
            leadingIcon={<PaperclipIcon className="size-4" />}
            variant="outline"
            className="h-8 px-2"
          >
            Attachment
          </Button>
          <Button
            leadingIcon={<TagIcon className="size-4" />}
            variant="outline"
            className="h-8 px-2"
          >
            Labels
          </Button>
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
          <div className="ml-8 mt-3">
            <Textarea
              ref={descriptionFieldRef}
              onFocus={() => setActiveDescriptionField(true)}
              className={classNames("w-full", {
                "min-h-36": activeDescriptionField,
              })}
              placeholder="Add a more detailed description…"
            />
            {activeDescriptionField && (
              <div className="flex gap-3 mt-3">
                <Button onClick={onSubmitSavingDescription} variant="success">
                  Submit
                </Button>
                <Button
                  onClick={() => setActiveDescriptionField(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TaskDetailsModal;
