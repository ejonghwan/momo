import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

export interface InputContextType {
  value: string;
  count: number | string;
  setValue: Dispatch<SetStateAction<string>>;
  setCount: Dispatch<SetStateAction<number | string>>;
  currentLen: number;
}

interface InputContextProviderType {
  children: React.ReactNode;
}

export const InputContext = createContext<InputContextType | null>(null);

export const useInputProvider = () => {
  const context = useContext(InputContext);
  if (!context) throw new Error('is not input context');
  return context;
};

export const InputContextProvider = ({ children }: InputContextProviderType) => {
  const [value, setValue] = useState<string>('');
  const [count, setCount] = useState<number | string>(0);
  return (
    <InputContext.Provider value={{ value, count, setValue, setCount, currentLen: value.length }}>
      {children}
    </InputContext.Provider>
  );
};
