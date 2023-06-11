import React from "react";

const Input = ({ type, value, attr, onChange, checked }) => {
  return <input type={type} value={value} checked={checked} data-testid={attr} onChange={onChange}></input>;
};

export default Input;
