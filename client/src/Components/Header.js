import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import cuteBird from '../images/cute_bird.png';

import { postData } from '../Util/api.js';
import { getCookie, removeCookie } from '../Util/Cookies';

const Header = ({ login }) => {
  const navigate = useNavigate();

  const token = getCookie('accessToken');
  const memberId = getCookie('memberId');
  const refreshToken = localStorage.getItem('refreshToken');

  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/members/userProfile/${memberId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res =>
        setUserInfo({ ...userInfo, profileImage: res.data.profileImage }),
      );
  };

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, []);

  const handleNavigate = path => {
    navigate(path);
  };

  // 로그아웃
  const handleSignout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      postData('/members/logout', {
        headers: {
          Authorization: token,
        },
      })
        .then(res => {
          removeCookie('accessToken');
          removeCookie('memberId');
          localStorage.removeItem('refreshToken');
        })
        .then(res => window.location.replace('/'));
    }
  };

  return (
    <HeadContainer className="header__container">
      <LeftSection>
        <img
          src={cuteBird}
          alt="Logo"
          className="logo__image"
          onClick={() => handleNavigate('/')}
        />
        <div className="header__logo" onClick={() => handleNavigate('/')}>
          Tridom
        </div>
        <button
          className="button--default button--subtle"
          onClick={() => handleNavigate('/board')}
        >
          Travel Logs
        </button>
      </LeftSection>
      <RightSection>
        {login ? (
          <>
            <img
              onClick={() => handleNavigate(`/user/${memberId}`)}
              alt="profile_image"
              src={userInfo.profileImage}
            />
            <button
              className="button--default button--subtle"
              onClick={handleSignout}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <button
              className="button--default"
              onClick={() => handleNavigate('/login')}
            >
              Log In
            </button>
            <button
              className="button--primary"
              onClick={() => handleNavigate('/signup')}
            >
              Sign Up
            </button>
          </>
        )}
      </RightSection>
    </HeadContainer>
  );
};

export default Header;

const HeadContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 60px;
  z-index: 9999;
  top: 0;
  left: 0;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-left: 40px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-right: 50px;

  > img {
    width: 36px;
    height: 36px;
    border-radius: 18px;
    cursor: pointer;
  }
`;
