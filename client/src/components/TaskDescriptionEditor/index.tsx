import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import MenuBar from "./MenuBar";
import Button from "../Button";
import React from "react";
import { useUpdateTask } from "../../hooks/api/tasks/useUpdateTask";

interface TaskDescriptionEditorProps {
  initialContent: JSONContent;
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

    updateTask.mutate({
      boardId,
      taskId,
      updateTaskDto: { descriptionContent: contentJson },
    });
  };

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        // logic
      }
    };
    input.click();
  };

  if (!editor) return null;

  return (
    <div>
      <div className="editor-container border border-gray-500 rounded-sm">
        <MenuBar editor={editor} onAddImage={addImage} />
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
  );
}

export default TaskDescriptionEditor;
