import classNames from "classnames";
import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={classNames(
          "textarea resize-none border-gray-500 bg-transparent shadow-none",
          "focus:outline-0 focus:shadow-none focus:border-blue-500 transition-colors duration-300",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
