import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute;
  value?: string;
  checked?: boolean | undefined;
  onChange?: (e: React.ChangeEvent) => void;
}

const Input = ({ value, checked, ...props }: InputProps) => {
  return (
    <>
      <input value={value} checked={checked} {...props} />
    </>
  );
};

export default Input;
