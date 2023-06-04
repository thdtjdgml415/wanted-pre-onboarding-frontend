import React, { useEffect } from "react";
import { instance } from "../api/client";

const TodoItem = ({ data, onDelete }) => {
  //   console.log("data", data);
  //   useEffect(() => {
  //     deleteTodoList();
  //   });
  const deleteTodoList = async () => {
    const response = await instance.delete(`/todos/${data.id}`);
    console.log("삭제 후 응답", response);
    onDelete();
  };
  return (
    <li>
      <label>
        <input type="checkbox"></input>
        <span>{data?.todo}</span>
      </label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button" onClick={deleteTodoList}>
        삭제
      </button>
    </li>
  );
};

export default TodoItem;
