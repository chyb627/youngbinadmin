import { useState, useCallback, ChangeEvent } from 'react';

const useInput = (initValue = '') => {
  const [value, setter] = useState<string>(initValue);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  }, []);
  return [value, handler, setter] as const;
};

export default useInput;
