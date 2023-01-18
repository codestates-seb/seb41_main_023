import styled from 'styled-components';
import axios from 'axios';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {setCookie} from '../Util/Cookies';
import bgImage from '../images/login-page_side-image.jpg';

//const clientId = process.env.REACT_APP_CLIENT_ID;

const LoginPage = () => {
    const eref = useRef();
    const pref = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    // 이메일, 비밀번호
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // success, error 메세지
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    // 유효성 검사
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    // // 구글 로그인 토큰 저장
    // useEffect(() => {
    //   let getAccessToken = (key) => {
    //     return new URLSearchParams(location.search).get(key);
    //   };
    //   let getRefreshToken = (key) => {
    //     return new URLSearchParams(location.search).get(key);
    //   };
    //   let getMemberId = (key) => {
    //     return new URLSearchParams(location.search).get(key);
    //   };
    //   const searchAccessToken = getAccessToken("accessToken");
    //   const searchRefreshToken = getRefreshToken("refreshToken");
    //   const searchMemberId = getMemberId("memberId");
    //
    //   setCookie("memberId", searchMemberId);
    //
    //   if(searchAccessToken && searchRefreshToken) {
    //   setCookie("accessToken", searchAccessToken);
    //   localStorage.setItem("refreshToken", searchRefreshToken);
    //   }
    //
    //   //console.log(`search : ${location.search}`);
    //   //console.log(`access : ${searchAccessToken}, refresh : ${searchRefreshToken}`);
    //   //console.log(`memberId : ${searchMemberId}`);
    //
    //   if(getCookie("accessToken")) {
    //     console.log(getCookie("accessToken"));
    //     window.location.replace("/")
    //   }
    // }, [])

    useEffect(() => {
        eref.current.focus();
    }, []);

    // 로그인 요청
    const login = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/members/login`, {
                email,
                password,
            });
            console.log(response);

            if (response.status === 200) {
                setCookie("accessToken", response.headers.authorization);
                setCookie("memberId", response.data.memberId);
                localStorage.setItem("refreshToken", response.headers.refresh);
                alert("로그인되었습니다. 메인 페이지로 이동합니다.");
                window.location.replace("/");
            }
        } catch (err) {
            console.error(err);
            if (err.response.status === 401) {
                alert('이메일 또는 비밀번호를 잘못 입력하셨거나 등록되지 않은 회원입니다.');
                pref.current.value = '';
            } else if (err.response.status === 400) alert('탈퇴한 회원입니다.');
            else if (err.response.status === 404) alert('페이지를 찾을 수 없습니다.');
            else if (err.response.status === 500) alert('서버 점검 중...');
        }
    };

    // 로그인, 모든 유효성 검사가 통과 되어야 login 가능
    const onLogin = (e) => {
        //e.preventDefault();
        if (email.length !== 0 && password.length !== 0 && isEmail === true && isPassword === true)
            login();
        else if (!isEmail) alert('Email을 확인해주세요.');
        else if (!isPassword) alert('Password를 확인해주세요.');
    };


    // const googleLogin = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://ec2-13-125-238-7.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google"
    //     );
    //     console.log(response);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    // const gLogin = () => {
    //   window.location.replace("http://ec2-13-125-238-7.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google")
    //   navigate("//ec2-13-125-238-7.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google")
    // }


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
                '숫자와 영문, 특수문자(!, & 등)를 조합한 8~20자리의 비밀번호를 입력하세요.'
            );
            setIsPassword(false);
        } else {
            setPasswordMessage('올바른 비밀번호입니다.');
            setIsPassword(true);
        }
    }, []);

    // email 'enter' -> pw
    const emailEnter = (e) => {
        if (e.key === 'Enter') pref.current.focus();
    };

    // pw 'enter' -> login
    const pwEnter = (e) => {
        if (e.key === 'Enter') onLogin();
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
                    <h2>Welcome back!</h2>
                    <p>Log in to plan and save your trips in</p>

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
                        <div className={`input__message message${isEmail ? 'success' : 'error'}`}>
                            {emailMessage}
                        </div>
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
                        <div className={`input__message message${isPassword ? 'success' : 'error'}`}>
                            {passwordMessage}
                        </div>
                    )}

                    <button className="button--primary" onClick={onLogin}>
                        Log in
                    </button>
                    <button className="button--google"
                            onClick={() => navigate('//sebmain41team23.shop/oauth2/authorization/google')}>
                        <svg id="google"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35">
                            <path className="logo" fill="#4285f4"
                                  d="M26.64,18.2a10.34,10.34,0,0,0-.16-1.84H18v3.48h4.84A4.14,4.14,0,0,1,21,22.56v2.26H24a8.78,8.78,0,0,0,2.68-6.62Z"/>
                            <path className="bottom logo" fill="#34a853"
                                  d="M18,27a8.59,8.59,0,0,0,6-2.18L21,22.56A5.43,5.43,0,0,1,13,19.71H10V22a9,9,0,0,0,8,5Z"/>
                            <path className="left logo" fill="#fbbc05"
                                  d="M13,19.71a5.32,5.32,0,0,1,0-3.42V14H10A9,9,0,0,0,10,22l3-2.33Z"/>
                            <path className="top logo" fill="#ea4335"
                                  d="M18,12.58a4.86,4.86,0,0,1,3.44,1.35L24,11.34A8.65,8.65,0,0,0,18,9a9,9,0,0,0-8,5l3,2.33a5.36,5.36,0,0,1,5-3.71Z"/>
                        </svg>
                        Log in with Google
                    </button>
                    <button className="button--google"
                            onClick={() => navigate('//sebmain41team23.shop/oauth2/authorization/kakao')}>
                        <svg id="kakao"
                             xmlns="http://www.w3.org/2000/svg" viewBox="-75 -90 350 350">
                            <polygon className="kakao logo" fill="#3c1e1e" points="45 140 40 185 90 150 45 140"/>
                            <ellipse className="kakao logo" fill="#3c1e1e" cx="100" cy="80" rx="100" ry="80"/>
                        </svg>
                        Log in with Kakao
                    </button>
                    <button className="button--google"
                            onClick={() => navigate('//sebmain41team23.shop/oauth2/authorization/naver')}>
                        <svg version="1.1" id="naver"
                             xmlns="http://www.w3.org/2000/svg"
                             xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
                            <polygon className="logo" fill="#1ec800"
                                     points="115.9,145.8 83.7,98.4 83.7,145.8 50,145.8 50,54.3 84.2,54.3 116.4,101.6 116.4,54.3    150,54.3 150,145.8 115.9,145.8"/>
                        </svg>
                        Log in with Naver
                    </button>

                    <div className="log-in__sub-message">
                        Not a member? <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            </LeftContainer>

            <RightContainer/>
        </>
    );
};

export default LoginPage;

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
    min-width: 350px;

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
    }

    .log-in__sub-message {
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