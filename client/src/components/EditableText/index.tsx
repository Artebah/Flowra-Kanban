import React from "react";
import Input from "../Input";

interface EditableTextProps {
  text: string;
  onSave: (newText: string) => void;
  isEditable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditableText({
  text,
  onSave,
  isEditable,
  setIsEditable,
}: EditableTextProps) {
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
      onSave(updatedText);
    }
    closeTextInput();
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
