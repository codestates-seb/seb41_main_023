import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { getCookie, setCookie } from '../Util/Cookies';
import loadingImg from '../images/loading.gif';

const LoadingPage = () => {
  const location = useLocation();

  useEffect(() => {
    const getURLSearchParams = key => {
      return new URLSearchParams(location.search).get(key);
    };
    const searchAccessToken = getURLSearchParams('accessToken');
    const searchRefreshToken = getURLSearchParams('refreshToken');
    const searchMemberId = getURLSearchParams('memberId');

    if (searchAccessToken && searchRefreshToken) {
      setCookie('accessToken', searchAccessToken);
      setCookie('memberId', searchMemberId);
      localStorage.setItem('refreshToken', searchRefreshToken);
    }

    if (getCookie('accessToken')) {
      window.location.replace('/');
    } else {
      alert('이미 가입된 계정입니다! 가입된 이메일로 로그인해주세요');
      window.location.replace('/login');
    }
  }, []);

  return (
    <Background>
      <LoadingView>
        <img src={loadingImg} alt="Loading..." />
      </LoadingView>
    </Background>
  );
};

export default LoadingPage;

const Background = styled.div`
  height: 100vh;
  background: #ffffffb7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingView = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: black;
  opacity: 0.8;
  background: white;
  z-index: 99;
  text-align: center;

  img {
    width: 50px;
    height: 50px;
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
  }
`;
