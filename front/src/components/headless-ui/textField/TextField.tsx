import React from 'react';

import { InputContextProvider } from '@/context/InputProvider';

/** ------------------------------------------------------------------- */

interface TextFieldRootProps {
  //   type?: React.HTMLInputTypeAttribute;
  children: React.ReactNode;
  //   value?: string;
}
const TEXT_FIELD_ROOT = 'TextFieldRoot';

// const TextFieldRoot = (props: TextFieldRootProps) => {
const TextFieldRoot = ({ children }: TextFieldRootProps) => {
  return (
    <InputContextProvider>
      <>{children}</>
    </InputContextProvider>
  );
};

TextFieldRoot.displayName = TEXT_FIELD_ROOT;

/** ------------------------------------------------------------------- */

const TEXT_FIELD_WRAP = 'TextFieldWrap';

const TextFieldWrap = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

TextFieldWrap.displayName = TEXT_FIELD_WRAP;

/** ------------------------------------------------------------------- */

/** ------------------------------------------------------------------- */

interface TextFieldMassage {
  children: React.ReactNode;
  uiType?: 'error' | 'sub__text';
  className?: string;
  isError: boolean;
}

const TEXT_FIELD_MESSAGE = 'TextFieldMessage';

const TextFieldMassage = ({ children, uiType, className }: TextFieldMassage) => {
  return <div className={className}>{children}</div>;
};

TextFieldMassage.displayName = TEXT_FIELD_MESSAGE;

/** ------------------------------------------------------------------- */

const Root = TextFieldRoot;
const Wrap = TextFieldWrap;
const Message = TextFieldMassage;

export { Message, Root, Wrap };
