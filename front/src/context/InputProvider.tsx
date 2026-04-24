import React, { createContext, useContext, useState } from "react";

/*

1. crx, useProvider, ContextProvider 생성
2. 

*/

interface InputContextType {}

interface InputContextProviderType {
  children: React.ReactNode;
}

export const InputContext = createContext<InputContextType | null>(null);

export const useInputProvider = () => {
  const context = useContext(InputContext);
  if (!context) throw new Error("is not input context");
  return context;
};

export const InputContextProvider = ({
  children,
}: InputContextProviderType) => {
  const [value, setValue] = useState<string>("");
  const [count, setCount] = useState<number | string>(0);
  return (
    <InputContext.Provider value={{ value, count, currentLen: value.length }}>
      {children}
    </InputContext.Provider>
  );
};
