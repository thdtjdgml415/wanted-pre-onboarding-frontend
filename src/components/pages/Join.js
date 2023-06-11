import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api/client";

function Join() {
  const [joinValue, setJoinValue] = useState({
    joinEmail: "",
    joinPwd: "",
  });
  const { joinEmail, joinPwd } = joinValue;
  const [isbuttonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  console.log(joinValue);

  const movePage = () => {
    navigate("/signin", { replace: true });
  };

  const isToken = useCallback(() => {
    navigate("/signin", { replace: true });
  }, [navigate]);

  useEffect(() => {
    //토큰이 존재할 시 다시 로그인 페이지로 접속하면 페이지 리다이렉션
    if (localStorage.getItem("token")) {
      console.log("이미 토큰이 존재합니다.");
      isToken();
    }
  }, [navigate, isToken]);

  const handleJoinInput = (e) => {
    // console.log(e);
    const { value, name } = e.target;
    setJoinValue({ ...joinValue, [name]: value });
  };

  useEffect(() => {
    //이메일과 패스워드가 둘다 true일때 disabled를 true로 설정
    setIsButtonDisabled(validateEmail(joinValue.joinEmail) && validatePassword(joinValue.joinPwd));
  }, [joinValue]);

  const validateEmail = (email) => {
    // 이메일 유효성 검사를 위한 정규식
    // console.log("email", email);
    const re = /[@]/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // console.log("password", password);
    // 비밀번호는 8자리 이하여야 함
    return password.length >= 8;
  };
  const handleJoin = async (event) => {
    // console.log("event", event);
    event.preventDefault();
    if (!validateEmail(joinValue.joinEmail)) {
      alert("이메일 형식이 잘못되었습니다.");
      return;
    }
    if (!validatePassword(joinValue.joinPwd)) {
      alert("비밀번호는 8자리 이상이여야 함");
      return;
    }

    try {
      const response = await instance.post("/auth/signup", {
        email: joinValue.joinEmail,
        password: joinValue.joinPwd,
      });
      console.log("회원가입할때 받는 응답response", response);
      if (response.status === 201) {
        alert("회원가입이 완료되었습니다.");
        movePage();
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      alert(error.response.data.message);
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
            value={joinEmail}
            name="joinEmail"
            data-testid="email-input"
            onChange={handleJoinInput}
          />
        </div>
        <div>
          <label htmlFor="joinPwInput"> </label>
          <input
            type="password"
            id="joinPwInput"
            placeholder="비밀번호"
            value={joinPwd}
            name="joinPwd"
            data-testid="password-input"
            onChange={handleJoinInput}
          />
        </div>
        <div></div>
        <button className={"Btn big"} data-testid="signup-button" disabled={!isbuttonDisabled} onClick={handleJoin}>
          회원가입
        </button>
      </div>
    </section>
  );
}

export default Join;
