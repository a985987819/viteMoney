import { useState, useCallback, useMemo } from 'react';

export interface UseBooleanReturn {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

export function useBoolean(initialValue = false): UseBooleanReturn {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(prev => !prev), []);

  return useMemo(
    () => ({
      value,
      setValue,
      setTrue,
      setFalse,
      toggle,
    }),
    [value, setValue, setTrue, setFalse, toggle]
  );
}

export default useBoolean;
