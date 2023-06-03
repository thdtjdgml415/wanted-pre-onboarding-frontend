import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Todo() {
  const navigate = useNavigate();
  console.log("Auth", localStorage.getItem("token"));
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <div>Todo</div>
      <Link to="signup">로그인</Link>
      <Link to="signin">회원가입</Link>
    </>
  );
}

export default Todo;
