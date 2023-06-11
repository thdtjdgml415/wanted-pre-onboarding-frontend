import React from "react";

const Button = ({ classnames, onClick, data, children, disabled }) => {
  return (
    <button className={classnames} data-testid={data} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
