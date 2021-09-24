import Cookies from "universal-cookie";
import { useState } from "react";

export default function useCookie(key, initialValue, forever = false) {
  const [storedValue, setStoredValue] = useState(initialValue),
    cookies = new Cookies();

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      cookies.set(key, valueToStore, {
        expires: forever ? new Date(2147483647 * 1000) : undefined,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
