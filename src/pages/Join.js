import React, { useEffect, useState } from "react";
import { instance } from "../api/client";
import { useNavigate } from "react-router-dom";

function Login() {
  const [joinIdValue, setJoinIdValue] = useState("");
  const [joinPwValue, setJoinPwValue] = useState("");

  const [isbuttonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const movePage = () => {
    navigate("/signin", { replace: true });
  };

  useEffect(() => {
    //이메일과 패스워드가 둘다 true일때 disabled를 true로 설정
    setIsButtonDisabled(
      validateEmail(joinIdValue) && validatePassword(joinPwValue)
    );
  }, [joinIdValue, joinPwValue]);

  const validateEmail = (email) => {
    // 이메일 유효성 검사를 위한 정규식
    const re = /[@]/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // 비밀번호는 8자리 이하여야 함
    return password.length >= 8;
  };

  const handleJoin = async (event) => {
    // console.log("event", event);
    event.preventDefault();
    if (!validateEmail(joinIdValue)) {
      alert("이메일 형식이 잘못되었습니다.");
      return;
    }
    if (!validatePassword(joinPwValue)) {
      alert("비밀번호는 8자리 이상이여야 함");
      return;
    }
    // alert("로그인 성공");
    console.log("joinIdValue", joinIdValue);
    console.log("joinPwValue", joinPwValue);

    try {
      // console.log(joinIdValue);
      // console.log(joinPwValue);
      const response = await instance.post("/auth/signup", {
        email: joinIdValue,
        password: joinPwValue,
      });
      if (response.status === 201) {
        console.log("회원가입 성공");
        movePage();
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container">
      <div className="joinWrapper">
        <h1>회원가입</h1>
        <div>
          <label htmlFor="joinIdInput"> </label>
          <input
            id="joinIdInput"
            placeholder="이메일"
            // value={email}
            data-testid="email-input"
            onChange={(e) => setJoinIdValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="joinPwInput"> </label>
          <input
            type="password"
            id="joinPwInput"
            placeholder="비밀번호"
            // value={password}
            data-testid="password-input"
            onChange={(e) => setJoinPwValue(e.target.value)}
          />
        </div>
        <button
          id="joinBtn"
          data-testid="signup-button"
          disabled={!isbuttonDisabled}
          onClick={handleJoin}
        >
          가입하기
        </button>
      </div>
    </section>
  );
}

export default Login;
