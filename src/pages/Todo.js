import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "../components/TodoList";

function Todo() {
  const navigate = useNavigate();
  // console.log("Auth", localStorage.getItem("token"));
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="todoWrapper">
          <div className="todoInner">
            <TodoList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
