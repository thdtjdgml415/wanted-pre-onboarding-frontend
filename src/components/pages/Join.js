import React, { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  const [joinIdValue, setJoinIdValue] = useState("");
  const [joinPwValue, setJoinPwValue] = useState("");

  const [isbuttonDisabled, setIsButtonDisabled] = useState(false);

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

  const handleLogin = async (event) => {
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
    // console.log("loginIdValue", loginIdValue);
    // console.log("loginPwValue", loginPwValue);
    try {
      const response = await axios.post(
        " https://www.pre-onboarding-selection-task.shop/auth/signin",
        {
          headers: { "Content-Type": "application/json" },
          data: {
            joinIdValue,
            joinPwValue,
          },
        }
      );
      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container">
      <div className="loginWrapper">
        <h1>회원가입</h1>
        <div>
          <label htmlFor="loginIdInput"> </label>
          <input
            id="loginIdInput"
            placeholder="이메일"
            // value={email}
            data-testid="email-input"
            onChange={(e) => setJoinIdValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="loginPwInput"> </label>
          <input
            type="password"
            id="loginPwInput"
            placeholder="비밀번호"
            // value={password}
            data-testid="password-input"
            onChange={(e) => setJoinPwValue(e.target.value)}
          />
        </div>
        <button
          id="loginBtn"
          data-testid="signin-button"
          disabled={!isbuttonDisabled}
          onClick={handleLogin}
        >
          가입하기
        </button>
      </div>
    </section>
  );
}

export default Login;
