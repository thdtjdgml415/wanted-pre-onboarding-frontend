import React from "react";
import { Link } from "react-router-dom";

function Todo() {
  return (
    <>
      <div>Home</div>
      <Link to="signup">로그인</Link>
      <Link to="signin">회원가입</Link>
    </>
  );
}

export default Todo;