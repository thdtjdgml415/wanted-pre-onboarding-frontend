import React from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const handleMoveLogin = () => {
    navigate("/signin", { replace: true });
  };
  const hnadleMoveJoin = () => {
    navigate("/signup", { replace: true });
  };

  return (
    <>
      <div>Home</div>
      <div onClick={handleMoveLogin}>로그인</div>
      <div onClick={hnadleMoveJoin}>회원가입</div>
    </>
  );
}

export default Main;
