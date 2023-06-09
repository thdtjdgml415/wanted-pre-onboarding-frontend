import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api/client";

function Login() {
  const [loginValue, setLoginValue] = useState({
    loginEmail: "",
    loginPwd: "",
  });
  const { loginEmail, loginPwd } = loginValue;
  const [isbuttonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const goJoinPage = () => {
    navigate("/signup");
  };

  const movePage = () => {
    navigate("/todo", { replace: true });
  };

  const isToken = useCallback(() => {
    navigate("/todo", { replace: true });
  }, [navigate]);

  useEffect(() => {
    //토큰이 존재할 시 다시 로그인 페이지로 접속하면 페이지 리다이렉션
    if (localStorage.getItem("token")) {
      console.log("이미 토큰이 존재합니다.");
      isToken();
    }
  }, [navigate, isToken]);

  const handleLoginInput = (e) => {
    const { value, name } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
  };

  useEffect(() => {
    //이메일과 패스워드가 둘다 true일때 disabled를 true로 설정
    setIsButtonDisabled(validateEmail(loginValue.loginEmail) && validatePassword(loginValue.loginPwd));
  }, [loginValue]);

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
    event.preventDefault();
    if (!validateEmail(loginValue.loginEmail)) {
      alert("이메일 형식이 잘못되었습니다.");
      return;
    }
    if (!validatePassword(loginValue.loginPwd)) {
      alert("비밀번호는 8자리 이상이여야 함");
      return;
    }

    try {
      const response = await instance.post("/auth/signin", {
        email: loginValue.loginEmail,
        password: loginValue.loginPwd,
      });
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
        <div className="loginEmailArea">
          <label htmlFor="loginIdInput"> </label>
          <input
            id="loginIdInput"
            placeholder="이메일"
            value={loginEmail}
            name="loginEmail"
            data-testid="email-input"
            onChange={handleLoginInput}
          />
        </div>
        <div className="loginPwdArea">
          <label htmlFor="loginPwInput"> </label>
          <input
            type="password"
            id="loginPwInput"
            placeholder="비밀번호"
            value={loginPwd}
            name="loginPwd"
            data-testid="password-input"
            onChange={handleLoginInput}
          />
          <div className="goJoin" onClick={goJoinPage}>
            회원가입
          </div>
        </div>
        <button className="Btn big" data-testid="signin-button" disabled={!isbuttonDisabled} onClick={handleLogin}>
          로그인
        </button>
      </div>
    </section>
  );
}

export default Login;
