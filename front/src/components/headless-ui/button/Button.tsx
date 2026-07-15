import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
const Button = ({ children, ...props }: ButtonProps) => {
  if (children) {
    return <button {...props}>{children}</button>;
  }

  return <button {...props}>Button</button>;
};

export default Button;
