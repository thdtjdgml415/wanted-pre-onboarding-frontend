import React, { useEffect, useState } from "react";
import { instance } from "../api/client";
import Input from "./atom/Input";

const TodoItem = ({ data, onDelete, updateTodoList }) => {
  const [isTodoCompleted, setIsTodoCompleteCompleted] = useState(data.isCompleted);
  const [isEditing, setIsEditing] = useState(false);
  const [updateData, setUpdateData] = useState("");

  const handleComplete = (e) => {
    // console.log(e);
    setIsTodoCompleteCompleted(e.target.checked);
    updateTodo();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    updateTodo();
  }, [isTodoCompleted]);

  const updateTodo = async () => {
    const response = await instance.put(`/todos/${data.id}`, {
      todo: data.todo,
      isCompleted: isTodoCompleted,
    });
    // console.log(response);
    if (response.status === 200) {
      console.log("업데이트 완료");
      updateTodoList();
    }
    // console.log("CheckBox 추가 후 응답", response);
  };

  const handleEditSubmit = async () => {
    const response = await instance.put(`/todos/${data.id}`, {
      todo: updateData,
      isCompleted: isTodoCompleted,
    });
    console.log(response);
    setIsEditing(false);
    updateTodoList();
  };

  const handleEditChange = (e) => {
    console.log(e.target.value);
    setUpdateData(e.target.value);
  };

  const deleteTodoList = async () => {
    const response = await instance.delete(`/todos/${data.id}`);
    console.log("삭제 후 응답", response);
    onDelete();
  };

  return (
    <li>
      <label>
        <input type="checkbox" checked={data.isCompleted} onChange={handleComplete}></input>
        {isEditing ? (
          <Input
            value={isEditing ? updateData : data?.todo}
            onChange={handleEditChange}
            // onBlur={handleInputBlur}
          />
        ) : (
          <span>{data?.todo}</span>
        )}
      </label>
      <div className="todoBtnWrap">
        {isEditing ? (
          <button data-testid="submit-button" onClick={handleEditSubmit}>
            제출
          </button>
        ) : (
          <button data-testid="modify-button" onClick={handleEditClick}>
            수정
          </button>
        )}
        {isEditing ? (
          <button
            data-testid="cancel-button"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            취소
          </button>
        ) : (
          <button data-testid="delete-button" onClick={deleteTodoList}>
            삭제
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
