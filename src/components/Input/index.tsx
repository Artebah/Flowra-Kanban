import classNames from "classnames";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({className, ...props}, ref) => {
    return (
        <input
            ref={ref}
            className={classNames(
                "input resize-none border-gray-500 bg-transparent shadow-none",
                "focus:outline-0 focus:shadow-none focus:border-blue-500 transition-colors duration-300",
                className
            )}
            {...props}
        />
    );
});

Input.displayName = "Input";

export default Input;
