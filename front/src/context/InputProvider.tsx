import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface InputContextType {
  value: string;
  count: number | string;
  setValue: Dispatch<SetStateAction<string>>;
  setCount: Dispatch<SetStateAction<number | string>>;
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

  const handleIncCount = () => {
    setCount(value.length);
  };

  const contextValue = useMemo(
    () => ({ value, count, setValue, setCount }),
    [value, count, setValue, setCount],
  );

  console.log('context val?', value);
  console.log('context count?', count);

  return <InputContext.Provider value={contextValue}>{children}</InputContext.Provider>;
};
