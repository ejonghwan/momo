import { Input, TextField } from '@/components/headless-ui';

interface UxTextFieldProps {
  message: {
    className: string;
    children: React.ReactNode;
    isError: boolean;
  };
}

const UxTextField = ({ message }: UxTextFieldProps) => {
  const { isError, children, className } = message;

  return (
    <>
      <TextField.Root>
        {/* <TextField.Wrap children={<>asdasd</> } /> */}
        <TextField.Wrap>
          <Input.Root />
          {/* <Test /> */}
          <TextField.Message isError={isError} className={className}>
            {children}
          </TextField.Message>
        </TextField.Wrap>
      </TextField.Root>
    </>
  );
};

export default UxTextField;
