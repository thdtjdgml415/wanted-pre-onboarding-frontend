import React, { useState } from "react";
import Button from "./atom/Button";
import { instance } from "../api/client";

const TodoItem = ({ data, onDelete, updateTodoList }) => {
  const [isTodoCompleted, setIsTodoCompleted] = useState(data.isCompleted);
  const [isEditing, setIsEditing] = useState(false);
  const [updateData, setUpdateData] = useState(data.todo);

  const handleComplete = async (e) => {
    setIsTodoCompleted(e.target.checked);
    try {
      await instance.put(`/todos/${data.id}`, {
        todo: updateData,
        isCompleted: e.target.checked,
      });
      updateTodoList();
    } catch (error) {
      console.error("Failed to update todo: ", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdateData(data.todo);
  };

  const handleEditSubmit = async () => {
    try {
      await instance.put(`/todos/${data.id}`, {
        todo: updateData,
        isCompleted: isTodoCompleted,
      });
      setIsEditing(false);
      updateTodoList();
    } catch (error) {
      alert("글을 입력해주세요");
      console.error("Failed to update todo: ", error);
    }
  };

  const handleEditChange = (e) => {
    setUpdateData(e.target.value);
  };

  const deleteTodo = async () => {
    try {
      await instance.delete(`/todos/${data.id}`);
      onDelete();
    } catch (error) {
      console.error("Failed to delete todo: ", error);
    }
  };

  return (
    <li>
      <label>
        <input type="checkbox" checked={data.isCompleted} onChange={handleComplete} className="todoCheck"></input>
        {isEditing ? <input value={updateData} onChange={handleEditChange} /> : <span>{data?.todo}</span>}
      </label>
      <div className="todoBtnWrap">
        {isEditing ? (
          <Button classnames={"Btn small"} type="text" data-testid="submit-button" onClick={handleEditSubmit}>
            제출
          </Button>
        ) : (
          <Button classnames={"Btn small"} data-testid="modify-button" onClick={handleEditClick}>
            수정
          </Button>
        )}

        {isEditing ? (
          <Button
            classnames={"Btn small"}
            data-testid="cancel-button"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            취소
          </Button>
        ) : (
          <Button classnames={"Btn small"} data-testid="delete-button" onClick={deleteTodo}>
            삭제
          </Button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
