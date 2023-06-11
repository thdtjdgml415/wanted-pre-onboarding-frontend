import React from "react";

const Button = ({ classnames, attr, onClick, children, disabled }) => {
  return (
    <button className={classnames} data-testid={attr} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
