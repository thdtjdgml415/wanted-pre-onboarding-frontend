import React, { useEffect, useState } from "react";
import { instance } from "../api/client";
import TodoItem from "./TodoItem";
import Input from "./atom/Input";

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

  //글 추가
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

  //삭제시 리렌더링
  const onDeleteTodo = () => {
    console.log("삭제함");
    fetchTodoList();
  };
  //checkbox추가시 리렌더링
  const updateTodoList = () => {
    // console.log("완료표시 후 렌더링");
    fetchTodoList();
  };

  return (
    <>
      <div>
        <input value={todoValue} onChange={addTodoList} data-testid="new-todo-input" />
        <button data-testid="new-todo-add-button" onClick={addTodoBtn}>
          추가
        </button>
      </div>
      <ul>
        {getTodoData.map((data) => {
          // console.log("리스트 map", data);
          return <TodoItem key={data.id} data={data} onDelete={onDeleteTodo} updateTodoList={updateTodoList} />;
        })}
      </ul>
    </>
  );
};

export default TodoList;
