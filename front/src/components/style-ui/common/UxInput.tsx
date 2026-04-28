import React from 'react';

import Input from '@/components/headless-ui/Input';
import { InputContextProvider } from '@/context/InputProvider';

/** ------------------------------------------------------------------- */

interface TextFieldRootProps {
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
