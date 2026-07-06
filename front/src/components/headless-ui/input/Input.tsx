import React, { InputHTMLAttributes } from 'react';

/** ------------------------------------------------------------------- */

// export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
// type: React.HTMLInputTypeAttribute;
// value?: string;
// checked?: boolean | undefined;
// onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
// props?: InputHTMLAttributes<HTMLInputElement>;
// props?: InputHTMLAttributes<HTMLInputElement>;
// }

const INPUT_NAME = 'input';
// const Input = ({ value, checked, onChange, ...props }: InputProps) => {
const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} />;
};

Input.displayName = INPUT_NAME;

/** ------------------------------------------------------------------- */

const Root = Input;

export { Root };
