import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute;
  value?: string;
  checked?: boolean | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, checked, onChange, ...props }: InputProps) => {
  return (
    <>
      <input value={value} checked={checked} {...props} onChange={onChange} />
    </>
  );
};

export default Input;
