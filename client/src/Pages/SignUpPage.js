import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Modal from '../Components/user/Modal';

import { getCookie } from '../Util/Cookies';
import bgImage from '../images/signup-page_side-image.jpg';

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

  //이메일 인증번호 검사 모달창
  const [verificationIsOpened, setVerificationIsOpened] = useState(false);
  const [authNum, setAuthNum] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showPswd, setShowPswd] = useState(false);

  // 렌더링 될때 username input으로 focus
  useEffect(() => {
    uref.current.focus();
  }, []);

  // 회원가입 요청
  const signUp = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/members/signup`, {
        email,
        displayName,
        password,
      });
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login', { replace: true });
    } catch (err) {
      console.error(err);
      if (err.response.status === 404) alert('페이지를 찾을 수 없습니다.');
      else if (err.response.status === 409)
        alert('이미 가입된 회원입니다. 이메일을 확인해주세요.');
      else if (err.response.status === 500) alert('서버 점검 중...');
    }
  };

  // 회원가입, 모든 유효성 검사가 통과되어야 sign up 가능
  const onSignUp = e => {
    //e.preventDefault();
    if (
      displayName.length !== 0 &&
      email.length !== 0 &&
      password.length !== 0 &&
      isName === true &&
      isEmail === true &&
      isPassword === true &&
      isAuth === true
    )
      signUp();
    else if (!isName) alert('Username을 확인해주세요.');
    else if (!isEmail) alert('Email을 확인해주세요.');
    else if (!isPassword) alert('Password를 확인해주세요.');
    else if (!isAuth) alert('Email 인증을 먼저 해주세요');
  };

  // userName
  const onChangeName = useCallback(e => {
    const nameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{1,20}$/;
    setDisplayName(e.target.value);

    if (!nameRegex.test(e.target.value)) {
      setNameMessage('영문과 한글 또는 숫자를 1~20자리로 입력하세요.');
      setIsName(false);
    } else {
      setNameMessage('올바른 이름입니다.');
      setIsName(true);
    }
  }, []);

  // email
  const onChangeEmail = useCallback(e => {
    const emailRegex =
      /^[0-9a-zA-Z_]{4,}([-_.]?[0-9a-zA-Z])*@[a-zA-Z]{3,}([-_.]?[a-zA-Z])*.[a-zA-Z]{2,}$/i;
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
  const onChangePassword = useCallback(e => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=\S+$).{8,20}$/;
    setPassword(e.target.value);

    if (!passwordRegex.test(e.target.value)) {
      setPasswordMessage(
        '숫자, 영문, 특수문자(!, & 등)를 조합한 8~20자리의 비밀번호를 입력하세요.',
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('올바른 비밀번호입니다.');
      setIsPassword(true);
    }
  }, []);

  // username 'enter' -> email
  const usernameEnter = e => {
    if (e.key === 'Enter') eref.current.focus();
  };

  // email 'enter' -> pw
  const emailEnter = e => {
    if (e.key === 'Enter') pref.current.focus();
  };

  // pw 'enter' -> Sign up
  const pwEnter = e => {
    if (e.key === 'Enter') onSignUp();
  };

  const handleEmailVerificationModal = () => {
    setVerificationIsOpened(prevState => !prevState);
    setDisable(true);
  };

  const handleSendEmailCode = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/email/auth`,
        {
          email,
        },
        {
          headers: {
            Authorization: getCookie('accessToken'),
          },
        },
      )
      .then(res => {
        alert('인증번호가 발송되었습니다. 인증번호를 입력해주세요');
        setDisable(false);
      })
      .catch(err => console.log(err));
  };

  const handleEmailAuth = authNum => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/email/confirm?authNum=${authNum}`,
        {
          email,
        },
        {
          headers: {
            Authorization: getCookie('accessToken'),
          },
        },
      )
      .then(res => {
        alert('이메일 인증이 완료되었습니다!');
        setVerificationIsOpened(false);
        setIsAuth(true);
        setAuthNum('');
      })
      .catch(err => {
        console.log(err);
        alert('인증번호가 잘못되었습니다. 다시 한 번 입력해주세요!');
        setAuthNum('');
      });
  };

  const toggleShowPswd = () => {
    setShowPswd(!showPswd);
  };

  return (
    <>
      <Header>
        <div
          className="button--default back__button"
          onClick={() => navigate('/')}
        >
          Back
        </div>
      </Header>
      <LeftContainer>
        <div className="content">
          <h2 className="center">Welcome to </h2>
          <p className="center">Sign up to save your trips in </p>

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
            <div
              className={`input__message message__${
                isName ? 'success' : 'error'
              }`}
            >
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
            <div
              className={`email__message-container input__message message__${
                isEmail ? 'success' : 'error'
              }`}
            >
              {isEmail ? (
                <>
                  <span>{emailMessage} </span>
                  {isAuth ? (
                    <span className="email--verified">이메일 인증완료</span>
                  ) : (
                    <span
                      className="email--pending"
                      onClick={() => {
                        handleEmailVerificationModal();
                        handleSendEmailCode();
                      }}
                    >
                      인증번호 발송하기
                    </span>
                  )}
                </>
              ) : (
                emailMessage
              )}
            </div>
          )}

          <label>Password</label>
          <div className="password--container">
            <input
              className="input"
              type={showPswd ? 'text' : 'password'}
              placeholder="Enter your password"
              onChange={onChangePassword}
              onKeyDown={pwEnter}
              ref={pref}
            />
            <div onClick={toggleShowPswd} className="eye">
              {showPswd ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z"
                  />
                </svg>
              )}
            </div>
          </div>
          {password.length > 0 && (
            <div
              className={`input__message input__message-password message__${
                isPassword ? 'success' : 'error'
              }`}
            >
              {passwordMessage}
            </div>
          )}
          {verificationIsOpened && (
            <Modal
              title={'이메일 인증하기'}
              setModal={handleEmailVerificationModal}
              content={'이메일로 발송된 인증번호를 입력해주세요'}
              input={true}
              buttonName={'인증하기'}
              handleClick={() => handleEmailAuth(authNum)}
              authNum={authNum}
              setAuthNum={setAuthNum}
              disable={disable}
              setDisable={setDisable}
            />
          )}
          <button className="button--primary" onClick={onSignUp}>
            Sign up
          </button>
          <button
            className="button--google"
            onClick={() =>
              navigate(`${process.env.REACT_APP_API_SOCIAL_LOGIN}/google`)
            }
          >
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
          <button
            className="button--google"
            onClick={() =>
              navigate(`${process.env.REACT_APP_API_SOCIAL_LOGIN}/kakao`)
            }
          >
            <svg
              id="kakao"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-75 -90 350 350"
            >
              <polygon
                className="kakao logo"
                fill="#3c1e1e"
                points="45 140 40 185 90 150 45 140"
              />
              <ellipse
                className="kakao logo"
                fill="#3c1e1e"
                cx="100"
                cy="80"
                rx="100"
                ry="80"
              />
            </svg>
            Sign up with Kakao
          </button>
          <button
            className="button--google"
            onClick={() =>
              navigate(`${process.env.REACT_APP_API_SOCIAL_LOGIN}/facebook`)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={'#4267B2'}
            >
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
            Sign up with Facebook
          </button>

          <div className="signup__sub-message">
            Already a member? <Link to="/login">Log in</Link>
          </div>
        </div>
      </LeftContainer>

      <RightContainer />
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

  > div {
    cursor: pointer;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: 100vh;
  float: left;

  .center {
    display: flex;
    justify-content: center;
  }

  .password--container {
    background-color: aliceblue;
    position: relative;
    > .eye {
      position: absolute;
      top: 25%;
      left: 90%;
    }
  }
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

    .email__message-container {
      display: flex;
      justify-content: space-between;

      > span {
        color: green;
      }

      .email--pending {
        color: var(--primary-blue-dark);
        cursor: pointer;

        &:hover {
          color: var(--primary-blue);
        }
      }

      .email--verfied {
        color: var(--light);
        pointer-events: none;
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

    .message__success {
      margin-left: 4px;
      padding-top: var(--spacing-2);
      color: green;
    }

    .message__error {
      margin-left: 4px;
      padding-top: var(--spacing-2);
      color: red;
    }

    .title {
      color: var(--primary-blue-bright);
    }

    .modal__container {
      .button--danger {
        background-color: var(--primary-blue-bright);

        &:hover {
          background-color: var(--primary-blue);
        }

        &:active {
          background-color: var(--primary-blue-dark);
        }
      }
    }
  }
`;

const RightContainer = styled.div`
  width: 70vw;
  height: 100vh;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  float: right;
`;
