import { useState, useEffect } from "react";

// localstprage vars prefixed belong to this app
const PREFIX = "messagenger-";
/**
 * Function to store Values in the Localstorage and get a State out of it
 * @param {string} key in Localstorage
 * @param {string} initialValue default null
 * @returns {[string, function]} returns a statefull value and a function to update it
 */
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