import styled from 'styled-components';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import bgImage from '../images/signup-page_side-image.jpg';

//const clientId = process.env.REACT_APP_CLIENT_ID;

const SignUpPage = () => {
    const navigate = useNavigate();
    const uref = useRef();
    const eref = useRef();
    const pref = useRef();

    // 이름, 이메일, 비밀번호
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // success, error 메세지
    const [nameMessage, setNameMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    // 유효성 검사
    const [isName, setIsName] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    // 렌더링 될때 username input으로 focus
    useEffect(() => {
        uref.current.focus();
    }, []);

    // 회원가입 요청
    const signUp = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/members/signup`, {
                email,
                displayName,
                password,
            });
            alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
            navigate('/login');
            //console.log(response);
        } catch (err) {
            console.error(err);
            if (err.response.status === 404) alert('페이지를 찾을 수 없습니다.');
            else if (err.response.status === 409) alert('이미 가입된 회원입니다. 이메일을 확인해주세요.');
            else if (err.response.status === 500) alert('서버 점검 중...');
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
        else if (!isName) alert('Username을 확인해주세요.');
        else if (!isEmail) alert('Email을 확인해주세요.');
        else if (!isPassword) alert('Password를 확인해주세요.');
    };

    // userName
    const onChangeName = useCallback((e) => {
        const nameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{3,20}$/;
        setDisplayName(e.target.value);

        if (!nameRegex.test(e.target.value)) {
            setNameMessage('영문과 한글 또는 숫자를 3~20자리로 입력하세요.');
            setIsName(false);
        } else {
            setNameMessage('올바른 이름입니다.');
            setIsName(true);
        }
    }, []);

    // email
    const onChangeEmail = useCallback((e) => {
        const emailRegex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        setEmail(e.target.value);

        if (!emailRegex.test(e.target.value)) {
            setEmailMessage('이메일 형식을 확인해주세요.');
            setIsEmail(false);
        } else {
            setEmailMessage('올바른 이메일입니다.');
            setIsEmail(true);
        }
    }, []);

    // password
    const onChangePassword = useCallback((e) => {
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=\S+$).{8,20}$/;
        setPassword(e.target.value);

        if (!passwordRegex.test(e.target.value)) {
            setPasswordMessage(
                '숫자, 영문, 특수문자(!, & 등)를 조합한 8~20자리의 비밀번호를 입력하세요.'
            );
            setIsPassword(false);
        } else {
            setPasswordMessage('올바른 비밀번호입니다.');
            setIsPassword(true);
        }
    }, []);

    // username 'enter' -> email
    const usernameEnter = (e) => {
        if (e.key === 'Enter') eref.current.focus();
    };

    // email 'enter' -> pw
    const emailEnter = (e) => {
        if (e.key === 'Enter') pref.current.focus();
    };

    // pw 'enter' -> Sign up
    const pwEnter = (e) => {
        if (e.key === 'Enter') onSignUp();
    };

    return (
        <>
            <Header>
                <Link to="/">
                    <div className="header__logo">website name</div>
                </Link>
                <Link to="/blog">
                    <button className="button--default button--subtle">Travel logs</button>
                </Link>
            </Header>
            <LeftContainer>
                <div className="content">
                    <h2>Welcome to </h2>
                    <p>Sign up to save your trips in </p>

                    <label>Username</label>
                    <input
                        className="input"
                        type="name"
                        placeholder="Enter your username"
                        onChange={onChangeName}
                        onKeyDown={usernameEnter}
                        ref={uref}
                    />
                    {displayName.length > 0 && (
                        <div className={`input__message message${isName ? 'success' : 'error'}`}>
                            {nameMessage}
                        </div>
                    )}

                    <label>Email</label>
                    <input
                        className="input"
                        type="email"
                        placeholder="Enter your email"
                        onChange={onChangeEmail}
                        onKeyDown={emailEnter}
                        ref={eref}
                    />
                    {email.length > 0 && (
                        <label className={`input__message message${isEmail ? 'success' : 'error'}`}>
                            {emailMessage}
                        </label>
                    )}

                    <label>Password</label>
                    <input
                        className="input"
                        type="password"
                        placeholder="Enter your password"
                        onChange={onChangePassword}
                        onKeyDown={pwEnter}
                        ref={pref}
                    />
                    {password.length > 0 && (
                        <div className={`input__message input__message-password message${isPassword ? 'success' : 'error'}`}>
                            {passwordMessage}
                        </div>
                    )}

                    <button className="button--primary" onClick={onSignUp}>
                        Sign up
                    </button>
                    <button className="button--google"
                            onClick={() => navigate('//sebmain41team23.shop/oauth2/authorization/google')}>
                        <svg
                            xlink="http://www.w3.org/1999/xlink"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            width="20"
                            height="20"
                            viewBox="-3 0 20 20"
                        >
                            <path
                                d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"
                                fill="#4285F4"
                            ></path>
                            <path
                                d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"
                                fill="#34A853"
                            ></path>
                            <path
                                d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z"
                                fill="#FBBC05"
                            ></path>
                            <path
                                d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"
                                fill="#EA4335"
                            ></path>
                        </svg>
                        Sign up with Google
                    </button>
                    <button className="button--google"
                            onClick={() => navigate('//sebmain41team23.shop/oauth2/authorization/kakao')}>
                        <svg id="kakao"
                             xmlns="http://www.w3.org/2000/svg" viewBox="-75 -90 350 350">
                            <polygon className="kakao logo" fill="#3c1e1e" points="45 140 40 185 90 150 45 140"/>
                            <ellipse className="kakao logo" fill="#3c1e1e" cx="100" cy="80" rx="100" ry="80"/>
                        </svg>
                        Sign up with Kakao
                    </button>
                    <button className="button--google"
                            onClick={() => navigate('//sebmain41team23.shop/oauth2/authorization/facebook')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill={'#4267B2'}>
                            <path
                                d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                        </svg>
                        Sign up with Facebook
                    </button>

                    <div className='signup__sub-message'>
                        Already a member? <Link to="/login">Log in</Link>
                    </div>
                </div>
            </LeftContainer>

            <RightContainer/>
        </>
    );
};

export default SignUpPage;

const Header = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 0 50px;
  width: calc(100vw - 100px);
  height: 60px;
  z-index: 9999;

  .header__logo {
    cursor: pointer;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 100vh;
  float: left;

  .content {
    width: 350px;

    h2 {
      margin-bottom: var(--spacing-2);
      font-size: var(--x-large-heading-font-size);
      line-height: var(--x-large-heading-line-height);
      font-weight: 600;
      color: var(--primary-blue-bright);
    }

    p {
      margin-bottom: var(--spacing-4);
    }

    label {
      display: block;
      font-weight: 600;
      color: var(--dark-gray-1);
      margin-bottom: 6px;

      &:not(:first-child) {
        margin-top: var(--spacing-3);
      }
    }

    > .button--primary {
      margin: var(--spacing-3) 0;
      width: 100%;
      text-align: center;
    }

    > .button--google {
      display: flex;
      justify-content: center;
      gap: var(--spacing-2);
      margin-bottom: var(--spacing-3);
      width: 100%;
      text-align: center;

      svg {
        width: 16px;
        height: 16px;
      }
    }

    .input__message {
      padding-top: var(--spacing-2);
      color: var(--light);
      margin-bottom: var(--spacing-3);
      margin-top: 0 !important;
      font-weight: normal !important;
    }

    .input__message-password {
        margin-bottom: 0;
    }

    .signup__sub-message {
      text-align: center;
      color: var(--light);
    }
  }
`;

const RightContainer = styled.div`
  width: 50vw;
  height: 100vh;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  float: right;
`;