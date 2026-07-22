import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import MenuBar from "./MenuBar";
import Button from "../Button";
import React from "react";
import { useUpdateTask } from "../../hooks/api/tasks/useUpdateTask";
import { TextIcon } from "lucide-react";

interface TaskDescriptionEditorProps {
  initialContent: JSONContent | null;
  boardId: string;
  taskId: string;
}

function TaskDescriptionEditor({
  initialContent,
  boardId,
  taskId,
}: TaskDescriptionEditorProps) {
  const [isDescriptionActive, setIsDescriptionActive] = React.useState(false);
  const updateTask = useUpdateTask();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: false,
        HTMLAttributes: {
          class: "rounded-lg shadow-sm max-w-full",
        },
      }),
    ],
    content: initialContent,

    onFocus() {
      setIsDescriptionActive(true);
    },
  });

  const handleCancel = () => {
    editor.commands.setContent(initialContent);
    setIsDescriptionActive(false);
  };
  const handleSubmit = () => {
    const contentJson = editor.getJSON() as JSONContent;

    updateTask.mutate(
      {
        boardId,
        taskId,
        updateTaskDto: { descriptionContent: contentJson },
      },
      {
        onSuccess: () => {
          setIsDescriptionActive(false);
        },
      }
    );
  };

  if (!editor) return null;

  return (
    <div className="mt-8 px-6 pb-8">
      <div className="flex gap-3">
        <TextIcon /> <p className="font-bold">Description</p>
      </div>
      <div className="mt-3 ml-8">
        <div className="editor-container border border-gray-500 rounded-sm">
          {isDescriptionActive && <MenuBar editor={editor} />}
          <EditorContent editor={editor} />
        </div>
        {isDescriptionActive && (
          <div className="flex gap-3 mt-3">
            <Button onClick={handleSubmit} variant="success">
              Submit
            </Button>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskDescriptionEditor;
