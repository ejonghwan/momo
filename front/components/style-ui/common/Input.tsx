import React from "react";
import { InputContextProvider } from "@/context/InputProvider";
import Input from "@/components/headless-ui/Input";

/** ------------------------------------------------------------------- */

interface TextFieldRootProps {
  type: React.HTMLInputTypeAttribute;
  value?: string;
}
const TEXT_FIELD_ROOT = "TextFieldRoot";

const TextFieldRoot = (props: TextFieldRootProps) => {
  return (
    <InputContextProvider>
      <Input {...props} />
    </InputContextProvider>
  );
};

TextFieldRoot.displayName = TEXT_FIELD_ROOT;

/** ------------------------------------------------------------------- */
