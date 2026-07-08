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
    // maxLength={}
    <InputContextProvider>
      <>{children}</>
    </InputContextProvider>
  );
};

TextFieldRoot.displayName = TEXT_FIELD_ROOT;

/** ------------------------------------------------------------------- */

interface TextFieldWrapProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const TEXT_FIELD_WRAP = 'TextFieldWrap';

const TextFieldWrap = ({ children, as, className }: TextFieldWrapProps) => {
  const Component = as || 'div';
  return <Component className={className}>{children}</Component>;
};

TextFieldWrap.displayName = TEXT_FIELD_WRAP;

/** ------------------------------------------------------------------- */

/** ------------------------------------------------------------------- */

interface TextFieldMassage {
  children: React.ReactNode;
  uiType?: 'error' | 'sub__text';
  className?: string;
}

const TEXT_FIELD_MESSAGE = 'TextFieldMessage';

const TextFieldMassage = ({ children, uiType, className }: TextFieldMassage) => {
  return (
    <div className={className}>
      {uiType} / {children}
    </div>
  );
};

TextFieldMassage.displayName = TEXT_FIELD_MESSAGE;

/** ------------------------------------------------------------------- */

const Root = TextFieldRoot;
const Wrap = TextFieldWrap;
const Message = TextFieldMassage;

export { Message, Root, Wrap };
