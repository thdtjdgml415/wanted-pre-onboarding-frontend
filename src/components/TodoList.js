import React, { useEffect, useState } from "react";
import { instance } from "../api/client";
import TodoItem from "./TodoItem";

// console.log("TodoList client", instance);

const TodoList = () => {
  const [getTodoData, setGetTodoData] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  useEffect(() => {
    fetchTodoList();
    console.log("첫 렌더링시 발동 과 Todo 추가시 발동");
  }, []);

  const fetchTodoList = async () => {
    const response = await instance.get("/todos");
    setGetTodoData(response.data);
  };

  // console.log(getTodoData);
  const addTodoList = (todoValue) => {
    // console.log(todoValue.target.value);
    setTodoValue(todoValue.target.value);
    console.log("추가할 글");
  };

  const addTodoBtn = async () => {
    const response = await instance.post(`/todos`, {
      todo: todoValue,
    });
    console.log("데이터를 추가한 list 발동", response);
    fetchTodoList();
    onReset();
  };

  const onReset = () => {
    setTodoValue("");
  };

  const onDeleteTodo = () => {
    fetchTodoList();
  };

  return (
    <div>
      <input
        value={todoValue}
        onChange={addTodoList}
        data-testid="new-todo-input"
      ></input>
      <button data-testid="new-todo-add-button" onClick={addTodoBtn}>
        추가
      </button>
      <ul>
        {getTodoData.map((data) => {
          // console.log("리스트 map", data);
          return <TodoItem key={data.id} data={data} onDelete={onDeleteTodo} />;
        })}
      </ul>
    </div>
  );
};

export default TodoList;