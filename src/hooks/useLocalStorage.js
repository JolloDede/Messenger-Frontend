import { useState, useEffect } from "react";

const PREFIX = "messagenger-";
export default function useLocalStorage(key, initialValue = null) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }else if (typeof initialValue === "function") {
      return initialValue();
    }else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}