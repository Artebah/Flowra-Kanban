import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

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
  });

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        //const url = await handleImageUpload(file, boardId, taskId);
        //editor?.chain().focus().setImage({ src: url }).run();
      }
    };
    input.click();
  };

  if (!editor) return null;

  return (
    <div className="editor-container">
      <button onClick={addImage} type="button">
        Add Image
      </button>
      <EditorContent editor={editor} />
    </div>
  );
}

export default TaskDescriptionEditor;
