import React, { useEffect, useState } from "react";
import { instance } from "../../api/client";
import TodoItem from "./TodoItem";
import Button from "../atom/Button";
import Input from "../atom/Input";

const TodoList = () => {
  const [getTodoData, setGetTodoData] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchTodoList();
      // console.log("첫 렌더링시 발동 과 Todo 추가시 발동");
    }
  }, []);

  const fetchTodoList = async () => {
    const response = await instance.get("/todos");
    setGetTodoData(response.data);
  };

  const addTodoList = (todoValue) => {
    setTodoValue(todoValue.target.value);
    // console.log("추가할 글");
  };

  //글 추가
  const addTodoBtn = async () => {
    try {
      const response = await instance.post(`/todos`, {
        todo: todoValue,
      });
      setGetTodoData([
        ...getTodoData,
        {
          id: response.data.id,
          isCompleted: response.data.isCompleted,
          todo: response.data.todo,
          userId: response.data.userId,
        },
      ]);
      onReset();
    } catch (error) {
      if (error.response.status === 400) {
        alert("글을 입력해주세요");
        return;
      }
      console.log(error);
    }
  };

  const onReset = () => {
    setTodoValue("");
  };

  //삭제시 리렌더링
  const onDeleteTodo = () => {
    // console.log("삭제함");
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
        <Input className={"addTodoListInput"} value={todoValue} onChange={addTodoList} attr={"new-todo-input"} />
        <Button classnames={"Btn small"} data={"new-todo-add-button"} onClick={addTodoBtn}>
          추가
        </Button>
      </div>
      <ul>
        {getTodoData.map((data) => {
          return <TodoItem key={data.id} data={data} onDelete={onDeleteTodo} updateTodoList={updateTodoList} />;
        })}
      </ul>
    </>
  );
};

export default TodoList;
