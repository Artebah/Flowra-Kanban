import React from "react";
import Input from "../Input";

interface EditableTextProps {
  initialText: string;
  isEditable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditableText({
  initialText,
  isEditable,
  setIsEditable,
}: EditableTextProps) {
  const [text, setText] = React.useState(initialText);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable, inputRef]);

  const openTextInput = () => {
    setIsEditable(true);
  };

  const closeTextInput = () => {
    setIsEditable(false);
  };

  const onSaveText = (e: React.FocusEvent<HTMLInputElement>) => {
    const updatedText = e.target.value;

    if (updatedText !== text) {
      setText(updatedText);
      closeTextInput();
    } else {
      closeTextInput();
    }
  };

  return isEditable ? (
    <Input ref={inputRef} defaultValue={text} onBlur={onSaveText} />
  ) : (
    <p className="w-full" onClick={openTextInput}>
      {text}
    </p>
  );
}

export default EditableText;
