import React from 'react';

import Input, { InputProps } from '@/components/headless-ui/Input';
import { InputContextProvider } from '@/context/InputProvider';

/** ------------------------------------------------------------------- */

interface TextFieldRootProps extends InputProps {
  type: React.HTMLInputTypeAttribute;
  value?: string;
}
const TEXT_FIELD_ROOT = 'TextFieldRoot';

const TextFieldRoot = (props: TextFieldRootProps) => {
  return (
    <InputContextProvider>
      <Input {...props} />
    </InputContextProvider>
  );
};

TextFieldRoot.displayName = TEXT_FIELD_ROOT;

/** ------------------------------------------------------------------- */

interface TextFieldProps extends InputProps {
  type: React.HTMLInputTypeAttribute;
  value?: string;
}
const TEXT_FIELD = 'TextField';

const TextField = (props: TextFieldProps) => {
  return (
    <InputContextProvider>
      <TextFieldRoot {...props} />
    </InputContextProvider>
  );
};

TextField.displayName = TEXT_FIELD;

/** ------------------------------------------------------------------- */

export { TextField };
