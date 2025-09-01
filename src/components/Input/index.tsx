import classNames from "classnames";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input({ className, ...props }: InputProps) {
  return <input className={classNames(className)} {...props} />;
}

export default Input;
