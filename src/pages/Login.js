import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../api/client";

function Login() {
  const [loginIdValue, setLoginIdValue] = useState("");
  const [loginPwValue, setLoginPwValue] = useState("");

  const [isbuttonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const movePage = () => {
    navigate("/todo", { replace: true });
  };

  const isToken = () => {
    navigate("/todo", { replace: true });
  };

  useEffect(() => {
    //토큰이 존재할 시 다시 로그인 페이지로 접속하면 페이지 리다이렉션
    if (localStorage.getItem("token")) {
      console.log("이미 토큰이 존재합니다.");
      isToken();
    }
  }, []);

  useEffect(() => {
    //이메일과 패스워드가 둘다 true일때 disabled를 true로 설정
    setIsButtonDisabled(
      validateEmail(loginIdValue) && validatePassword(loginPwValue)
    );
  }, [loginIdValue, loginPwValue]);

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
    if (!validateEmail(loginIdValue)) {
      alert("이메일 형식이 잘못되었습니다.");
      return;
    }
    if (!validatePassword(loginPwValue)) {
      alert("비밀번호는 8자리 이상이여야 함");
      return;
    }
    // alert("로그인 성공");
    // console.log("joinIdValue", loginIdValue);
    // console.log("joinPwValue", loginPwValue);

    try {
      // console.log(loginIdValue);
      // console.log(loginPwValue);
      const response = await instance.post("/auth/signin", {
        email: loginIdValue,
        password: loginPwValue,
      });
      console.log("로그인할때 받는 응답response", response);
      if (response.status === 200 && response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        movePage();
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <section className="container">
      <div className="loginWrapper">
        <h1>로그인</h1>
        <div>
          <label htmlFor="loginIdInput"> </label>
          <input
            id="loginIdInput"
            placeholder="이메일"
            // value={email}
            data-testid="email-input"
            onChange={(e) => setLoginIdValue(e.target.value)}
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
            onChange={(e) => setLoginPwValue(e.target.value)}
          />
        </div>
        <button
          id="loginBtn"
          data-testid="signin-button"
          disabled={!isbuttonDisabled}
          onClick={handleLogin}
        >
          로그인
        </button>
      </div>
    </section>
  );
}

export default Login;
