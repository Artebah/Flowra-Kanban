import React from "react";
import Input from "../Input";
import classNames from "classnames";

interface EditableTextProps {
  text: string;
  onSave: (newText: string) => void;
  isEditable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  containerClassName?: string;
  inputClassName?: string;
}

function EditableText({
  text,
  onSave,
  isEditable,
  setIsEditable,
  disabled = false,
  containerClassName,
  inputClassName,
}: EditableTextProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  const openTextInput = () => {
    setIsEditable(true);
  };

  const saveText = (value: string) => {
    if (value !== text) {
      onSave(value);
    }
    setIsEditable(false);
  };

  const onSaveText = (e: React.FocusEvent<HTMLInputElement>) => {
    saveText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveText(e.currentTarget.value);
    }
  };

  return (
    <div
      className={classNames(
        "font-semibold h-10 pl-0 flex items-center grow text-white w-full transition-all",
        disabled
          ? "cursor-not-allowed animate-pulse pointer-events-none"
          : "cursor-pointer",
        containerClassName
      )}
      onClick={!isEditable ? openTextInput : undefined}
    >
      {isEditable ? (
        <Input
          className={classNames("grow", inputClassName)}
          ref={inputRef}
          defaultValue={text}
          onBlur={onSaveText}
          onKeyDown={handleKeyDown}
        />
      ) : (
        text
      )}
    </div>
  );
}

export default EditableText;
