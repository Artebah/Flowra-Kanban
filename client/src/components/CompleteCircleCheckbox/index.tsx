import classNames from "classnames";
import { CheckIcon } from "lucide-react";

interface CompleteCircleCheckboxProps {
  isCompleted: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

function CompleteCircleCheckbox({
  isCompleted,
  onToggle,
  disabled,
}: CompleteCircleCheckboxProps) {
  return (
    <div
      className={classNames(
        "size-5 transition-all duration-200 ease-[cubic-bezier(0,0,0.58,1)]",
        "flex justify-center items-center border-gray-600 border bg-transparent relative rounded-full cursor-pointer",
        {
          "!border-emerald-400 !bg-emerald-400": isCompleted,
          "cursor-not-allowed! opacity-60": disabled,
        }
      )}
      onClick={disabled ? undefined : onToggle}
    >
      <div
        className={classNames(
          "absolute inset-0 rounded-full bg-emerald-400",
          "transition-all duration-300 ease-out",
          {
            "scale-0 opacity-0": !isCompleted,
            "scale-150 opacity-0": isCompleted,
          }
        )}
      />
      <div
        className={classNames(
          "absolute inset-0 rounded-full bg-emerald-400",
          "transition-all duration-300 ease-out delay-100",
          {
            "scale-0 opacity-0": !isCompleted,
            "scale-150 opacity-0": isCompleted,
          }
        )}
      />

      <CheckIcon
        className={classNames(
          "size-4 z-10 text-white scale-0 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
          {
            "scale-100": isCompleted,
          }
        )}
      />
      <input
        className="size-full opacity-0 absolute top-0 left-0 cursor-pointer"
        type="checkbox"
        checked={isCompleted}
        readOnly
      />
    </div>
  );
}

export default CompleteCircleCheckbox;
