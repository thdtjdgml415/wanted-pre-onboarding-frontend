import React from "react";

const Input = (props) => {
  //   console.log(props);
  const { value, attr, onChange } = props;
  return <input value={value} attr={attr} onChange={onChange}></input>;
};

export default Input;
