import styled from "styled-components";
import axios from "axios";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setCookie } from "../Util/Cookies";

const SignUpStyle = styled.div`
  width: 50vw;
  height: 100vh;
  float: left;
`;

const BackgroundImgStyle = styled.div`
  width: 50vw;
  height: 100vh;
  background-color: lightgray;
  float: right;
`;

const clientId = process.env.REACT_APP_CLIENT_ID;

const LoginPage = ({ setIsLoggedIn }) => {
  const eref = useRef();
  const pref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    eref.current.focus();
  }, []);

  // 이메일, 비밀번호
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // success, error 메세지
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  // 로그인 요청
  const login = async () => {
    try {
      const response = await axios.post(
        "https://www.sebmain41team23.shop/members/login",
        {
          email,
          password,
        }
      );
      console.log(response);

      if (response.status === 200) {
        setCookie("accessToken", response.headers.authorization);
        setCookie("memberId", response.data.memberId);
        localStorage.setItem("refresh-token", response.headers.refresh);
        setIsLoggedIn(true);
        alert("로그인되었습니다. 메인 페이지로 이동합니다.");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      if (err.response.status === 401)
        alert(
          "이메일 또는 비밀번호를 잘못 입력하셨거나 등록되지 않은 회원입니다."
        );
      else if (err.response.status === 404) alert("페이지를 찾을 수 없습니다.");
      else if (err.response.status === 500) alert("서버 점검 중...");
    }
  };

  // 로그인, 모든 유효성 검사가 통과 되어야 login 가능
  const onLogin = (e) => {
    //e.preventDefault();
    if (
      email.length !== 0 &&
      password.length !== 0 &&
      isEmail === true &&
      isPassword === true
    )
      login();
    else if (!isEmail) alert("Email을 확인해주세요.");
    else if (!isPassword) alert("Password를 확인해주세요.");
  };

  // email
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setEmail(e.target.value);

    if (!emailRegex.test(e.target.value)) {
      setEmailMessage("이메일 형식을 확인해주세요.");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일입니다.");
      setIsEmail(true);
    }
  }, []);

  // password
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=\S+$).{8,20}$/;
    setPassword(e.target.value);

    if (!passwordRegex.test(e.target.value)) {
      setPasswordMessage(
        "숫자와 영문, 특수문자(!, & 등)를 조합한 8~20자리의 비밀번호를 입력하세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("올바른 비밀번호입니다.");
      setIsPassword(true);
    }
  }, []);

  // email 'enter' -> pw
  const emailEnter = (e) => {
    if (e.key === "Enter") pref.current.focus();
  };

  // pw 'enter' -> login
  const pwEnter = (e) => {
    if (e.key === "Enter") onLogin();
  };

  return (
    <>
      <SignUpStyle>
        <Link to="/">
          <button>Logo</button>
        </Link>
        <Link to="/blog">
          <button>Travel logs</button>
        </Link>

        <div>Welcome back!</div>
        <div>Log in to plan and save your trips in</div>

        <div>Email</div>
        <input
          type="email"
          placeholder="Type Email and press 'Enter'"
          onChange={onChangeEmail}
          onKeyDown={emailEnter}
          ref={eref}
        />
        {email.length > 0 && (
          <span className={`message${isEmail ? "success" : "error"}`}>
            {emailMessage}
          </span>
        )}

        <div>Password</div>
        <input
          type="password"
          placeholder="Type Password and press 'Enter'"
          onChange={onChangePassword}
          onKeyDown={pwEnter}
          ref={pref}
        />
        {password.length > 0 && (
          <span className={`message${isPassword ? "success" : "error"}`}>
            {passwordMessage}
          </span>
        )}

        <button onClick={onLogin}>sign in</button>
        <button onClick={() => navigate("//")}>google</button>

        <div>
          Not a member? <Link to="/signup">Sign up</Link>
        </div>
      </SignUpStyle>

      <BackgroundImgStyle />
    </>
  );
};

export default LoginPage;
