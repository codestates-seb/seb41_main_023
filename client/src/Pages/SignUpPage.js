import styled from "styled-components";
import axios from "axios";
import { Link } from 'react-router-dom';
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

//const clientId = process.env.REACT_APP_CLIENT_ID;

const SignUpPage = () => {
  const navigate = useNavigate();

  const uref = useRef();
  const eref = useRef();
  const pref = useRef();

  // 렌더링 될때 username input으로 focus
  useEffect(() => {
    uref.current.focus();
  }, []);

  // 이름, 이메일, 비밀번호
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // success, error 메세지
  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // 유효성 검사
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  // 회원가입 요청
  const signUp = async () => {
    try {
      const response = await axios
      .post("https://www.sebmain41team23.shop/members/signup", {
        email,
        displayName,
        password,
      });
      navigate("/login");
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      console.log(response)
    } catch (err) {
      console.error(err);
      if (err.response.status === 404) alert("페이지를 찾을 수 없습니다.");
      else if (err.response.status === 500) alert("서버 점검 중...");
    }
  };

  // 회원가입, 모든 유효성 검사가 통과되어야 sign up 가능
  const onSignUp = (e) => {
    //e.preventDefault();
    if (
      displayName.length !== 0 &&
      email.length !== 0 &&
      password.length !== 0 &&
      isName === true &&
      isEmail === true &&
      isPassword === true
    )
      signUp();
    else if (!isName) alert("Username을 확인해주세요.");
    else if (!isEmail) alert("Email을 확인해주세요.");
    else if (!isPassword) alert("Password를 확인해주세요.");
  };

  // userName
  const onChangeName = useCallback((e) => {
    const nameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{3,20}$/;
    setDisplayName(e.target.value);

    if (!nameRegex.test(e.target.value)) {
      setNameMessage("영문과 한글 또는 숫자를 3~20자리로 입력하세요.");
      setIsName(false);
    } else {
      setNameMessage("올바른 이름입니다.");
      setIsName(true);
    }
  }, []);

  // email
  const onChangeEmail = useCallback((e) => {
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
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
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=\S+$).{8,20}$/;
    setPassword(e.target.value);

    if (!passwordRegex.test(e.target.value)) {
      setPasswordMessage("숫자, 영문, 특수문자(!, & 등)를 조합한 8~20자리의 비밀번호를 입력하세요.");
      setIsPassword(false);
    } else {
      setPasswordMessage("올바른 비밀번호입니다.");
      setIsPassword(true);
    }
  }, []);

  // username 'enter' -> email
  const usernameEnter = (e) => {
    if (e.key === "Enter") eref.current.focus();
  };

  // email 'enter' -> pw
  const emailEnter = (e) => {
    if (e.key === "Enter") pref.current.focus();
  };

  // pw 'enter' -> Sign up
  const pwEnter = (e) => {
    if (e.key === "Enter") onSignUp();
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

        <div>Welcome to </div>
        <div>Sign up to save your trips in </div>

        <div>Username</div>
        <input
          type="name"
          placeholder="Type Username and press 'Enter'"
          onChange={onChangeName}
          onKeyDown={usernameEnter}
          ref={uref}
        />
        {displayName.length > 0 && (
          <span className={`message${isName ? "success" : "error"}`}>
            {nameMessage}
          </span>
        )}

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

        <button onClick={onSignUp}>Sign up</button>
        <button onClick={() => navigate("//")}>google</button>

        <div>
          Already a member?<Link to="/login">Sign in</Link>
        </div>
      </SignUpStyle>

      <BackgroundImgStyle />
    </>
  );
}

export default SignUpPage;