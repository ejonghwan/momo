import { ChangeEvent } from 'react';

import { Input, TextField } from '@/components/headless-ui';

interface UxTextFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  message: {
    className?: string;
    children: React.ReactNode;
  };
}

const UxTextField = ({ message }: UxTextFieldProps) => {
  const { children: msgChildren, className } = message;

  return (
    <>
      <TextField.Root>
        {/* <TextField.Wrap children={<>asdasd</> } /> */}
        <TextField.Wrap>
          <Input.Root />
          {/* <Test /> */}
          <TextField.Message className={className}>{msgChildren}</TextField.Message>
        </TextField.Wrap>
      </TextField.Root>
    </>
  );
};

export default UxTextField;
