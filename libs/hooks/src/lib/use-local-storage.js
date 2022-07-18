import { useState, useCallback } from 'react';

/**
 * @description Hook to use local storage
 * @returns {[string, Function]} An array containing in order:
 * - `item` - The item stored in local storage.
 * - `setItem` - The function to set the item in local storage.
 */
export function useLocalStorage(key, initialValue) {
  const [item, setItem] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        setItem(value);
      } catch (error) {
        console.error(error);
      }
    },
    [key]
  );

  return [item, setValue];
}

export default useLocalStorage;
