import React from "react";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="mainWrap">
      <div>
        <h1 className="mainTitle">Home</h1>
        <div className="mainLinkWrap">
          <Link to="/todo">투두리스트</Link>

          <Link to="/signin">로그인</Link>

          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
