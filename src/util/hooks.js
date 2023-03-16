import { useState } from "react";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return [value, onChange];
}

function useInputFile(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    setValue(e.target.files[0]);
  };
  return [value, onChange];
}

export { useInput, useInputFile };