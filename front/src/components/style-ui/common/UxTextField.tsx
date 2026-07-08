import { ChangeEvent, ElementType, HTMLAttributes } from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import { Input, TextField } from '@/components/headless-ui';
import { cn } from '@/components/style-ui/common/btn1';

import '@/styles/common/UxTextfield.scss';

interface TextFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  message: {
    className?: string;
    children: React.ReactNode;
  };
}

const textFieldVariants = cva('textfield', {
  variants: {
    variant: {
      default: 'textfield--default',
      solid: 'textfield--solid',
      outline: 'textfield--outline',
      search: 'textfield--search',
      none: '',
    },

    uiType: {
      text: 'textfield--text',
      search: 'textfield--search',
      icon: 'textfield--icon',
      number: 'textfield--number',
      button: 'textfield--button',
      password: 'textfield--password',
    },

    size: {
      xlarge: 'textfield--xlarge',
      large: 'textfield--large',
      medium: 'textfield--medium',
      small: 'textfield--small',
      xsmall: 'textfield--xsmall',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'small',
  },
});

interface TextFieldProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>, VariantProps<typeof textFieldVariants> {
  as?: ElementType;
  children: string | React.ReactNode;
  placeHolder: string;
  uiType: 'text' | 'search' | 'icon' | 'number' | 'button' | 'password';
}

const UxTextField = ({ message, variant, size, placeHolder, uiType }: TextFieldProps) => {
  const { children: msgChildren, className } = message;

  if (uiType === 'text') {
    return (
      <>
        <TextField.Root>
          {/* <TextField.Wrap children={<>asdasd</> } /> */}
          <TextField.Wrap
            as={'div'}
            // className={style['textfield__wrap']}
            className={clsx(cn(textFieldVariants({ variant, size, className }), placeHolder))}
          >
            <Input.Root />
            <TextField.Message className={className}>{msgChildren}</TextField.Message>
          </TextField.Wrap>
        </TextField.Root>
      </>
    );
  }

  if (uiType === 'search') {
    return (
      <>
        <TextField.Root>
          {/* <TextField.Wrap children={<>asdasd</> } /> */}
          <TextField.Wrap
            as={'div'}
            // className={style['textfield__wrap']}
            className={clsx(cn(textFieldVariants({ variant, size, className }), placeHolder))}
          >
            <Input.Root />
            <TextField.Message className={className}>{msgChildren}</TextField.Message>
          </TextField.Wrap>
        </TextField.Root>
      </>
    );
  }
};

export default UxTextField;
