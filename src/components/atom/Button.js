import React from "react";

const Button = ({ classnames, attr, onClick, children, disabled }) => {
  // console.log("props", props);
  // const { } = props;
  // console.log(classnames, attr, onClick, children);
  return (
    <button className={classnames} data-testid={attr} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
