import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   value?: string;
   checked?: boolean | undefined;

}


const Input = ({ value, checked, ...props }: InputProps) => {
   return (
      <div>
         <input type="text" value={value} checked={checked} {...props} />
      </div>
   )
}

export default Input