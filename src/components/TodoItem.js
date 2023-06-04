import React from "react";

const TodoItem = ({ data }) => {
  //   console.log("data", data);
  return (
    <li>
      <label>
        <input type="checkbox"></input>
        <span>{data?.todo}</span>
      </label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button">삭제</button>
    </li>
  );
};

export default TodoItem;
