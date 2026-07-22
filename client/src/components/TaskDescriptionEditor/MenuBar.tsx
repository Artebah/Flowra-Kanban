import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
} from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

interface MenuBarProps {
  editor: Editor;
}

function MenuBar({ editor }: MenuBarProps) {
  const editorState = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => ({
      isBold: currentEditor.isActive("bold"),
      isItalic: currentEditor.isActive("italic"),
      isStrike: currentEditor.isActive("strike"),
      isHeading1: currentEditor.isActive("heading", { level: 1 }),
      isHeading2: currentEditor.isActive("heading", { level: 2 }),
      isBulletList: currentEditor.isActive("bulletList"),
      isOrderedList: currentEditor.isActive("orderedList"),
    }),
  });

  if (!editorState) return null;

  const btnClass = (isActive: boolean) => `
    p-2 rounded transition-colors duration-200
    ${
      isActive
        ? "bg-gray-dim text-creamy-latte"
        : "text-gray-400 hover:bg-gray-dim hover:text-gray-100"
    }
    disabled:opacity-20 disabled:pointer-events-none
  `;

  return (
    <div className="flex flex-wrap items-center gap-1 p-1.5 border-b border-gray-dim bg-[#232A32] rounded-t-lg">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(editorState.isBold)}
        title="Bold"
        type="button"
      >
        <Bold className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(editorState.isItalic)}
        title="Italic"
        type="button"
      >
        <Italic className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={btnClass(editorState.isStrike)}
        title="Strikethrough"
        type="button"
      >
        <Strikethrough className="w-4 h-4" />
      </button>

      <div className="w-[1px] bg-gray-dim mx-1 self-stretch my-1" />

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={btnClass(editorState.isHeading1)}
        title="Heading 1"
        type="button"
      >
        <Heading1 className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass(editorState.isHeading2)}
        title="Heading 2"
        type="button"
      >
        <Heading2 className="w-4 h-4" />
      </button>

      <div className="w-[1px] bg-gray-dim mx-1 self-stretch my-1" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editorState.isBulletList)}
        title="Bullet list"
        type="button"
      >
        <List className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnClass(editorState.isOrderedList)}
        title="Ordered list"
        type="button"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
    </div>
  );
}

export default MenuBar;
