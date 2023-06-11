import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "../molecules/TodoList";

function Todo() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, [navigate]);

  const GoBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <div className="todoWrapper">
          <div className="back" onClick={GoBack}>
            뒤로
          </div>
          <div className="todoHeader">
            <h1>Todo</h1>
          </div>
          <div className="todoInner">
            <TodoList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
