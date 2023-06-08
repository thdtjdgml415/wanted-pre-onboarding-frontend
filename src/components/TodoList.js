import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../api/client";
import TodoItem from "./TodoItem";
import Button from "./atom/Button";

const TodoList = () => {
  const [getTodoData, setGetTodoData] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const navigate = useNavigate();

  const GoBack = () => {
    navigate("/");
  };

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

  // console.log(getTodoData);
  const addTodoList = (todoValue) => {
    // console.log(todoValue.target.value);
    setTodoValue(todoValue.target.value);
    // console.log("추가할 글");
  };

  //글 추가
  const addTodoBtn = async () => {
    try {
      const response = await instance.post(`/todos`, {
        todo: todoValue,
      });
      console.log("데이터를 추가한 list 발동", response);
      fetchTodoList();
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
        <input className="addTodoListInput" value={todoValue} onChange={addTodoList} data-testid="new-todo-input" />
        <Button classnames={"addTodoListBtn"} attr="new-todo-add-button" onClick={addTodoBtn}>
          추가
        </Button>
        <div className="back" onClick={GoBack}>
          뒤로
        </div>
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
