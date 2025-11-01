import classNames from "classnames";
import { CheckIcon } from "lucide-react";
import React from "react";

function CompleteCircleCheckbox() {
  const [isCompleted, setIsCompleted] = React.useState(false);

  const toggleCompleted = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <div
      className={classNames(
        "size-5 transition-all duration-200 ease-[cubic-bezier(0,0,0.58,1)]",
        "flex justify-center items-center border-gray-600 border bg-transparent relative rounded-full cursor-pointer", // Додано cursor-pointer
        {
          "!border-emerald-400 !bg-emerald-400": isCompleted,
        }
      )}
      onClick={toggleCompleted} // Клік на div буде перемикати стан
    >
      {/* Перше кільце */}
      <div
        className={classNames(
          "absolute inset-0 rounded-full bg-emerald-400",
          "transition-all duration-300 ease-out", // Плавне зникнення
          {
            "scale-0 opacity-0": !isCompleted,
            "scale-150 opacity-0": isCompleted, // Вилітає і зникає
          }
        )}
      />
      {/* Друге кільце (з невеликою затримкою) */}
      <div
        className={classNames(
          "absolute inset-0 rounded-full bg-emerald-400",
          "transition-all duration-300 ease-out delay-100", // Затримка 100ms
          {
            "scale-0 opacity-0": !isCompleted,
            "scale-150 opacity-0": isCompleted, // Вилітає і зникає
          }
        )}
      />

      <CheckIcon
        className={classNames(
          "size-4 z-10 text-white scale-0 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]", // z-10, щоб галочка була над кільцями
          {
            "scale-100": isCompleted,
          }
        )}
      />
      {/* Input залишаємо, але тепер клікаємо на div */}
      <input
        // onChange={toggleCompleted} // Більше не потрібен тут, оскільки клікаємо на батьківський div
        className="size-full opacity-0 absolute top-0 left-0 cursor-pointer"
        type="checkbox"
        checked={isCompleted} // Для синхронізації стану input
        readOnly // Щоб input був контрольованим
      />
    </div>
  );
}

export default CompleteCircleCheckbox;
