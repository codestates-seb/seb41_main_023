import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

const Header = ({ login }) => {
  const [token, setToken] = useState();
  const [memberId, setMemberId] = useState();
  const [cookies, setCookie] = useCookies(['accessToken']);
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState('https://picsum.photos/50');

  // 토큰 설정
  // useEffect(() => {
  //   if (cookies.accessToken) {
  //     setToken(cookies.accessToken.token);
  //   }
  // }, []);

  // memberId 설정

  // 유저 프로필 요청
  //  useEffect(() => {
  //   if (memberId) {
  // axios
  //   .get(`${process.env.REACT_APP_API_URL}/members/${memberId}`, {
  //     headers: {
  //       Authorization: token,
  //       withCredentials: true,
  //     },
  //   })
  //   .then((res) => {
  //   console.log(res)
  //   })
  //   .catch((err) => console.log("error"));
  //      }
  //  }, [memberId]);

  // 프로필 이미지 요청
  // useEffect(() => {
  //     axios
  //       .get(`${process.env.REACT_APP_API_URL}/member/profile`, {
  //         headers: {
  //           Authorization: token,
  //           withCredentials: true,
  //         },
  //       })
  //       .then((res) => res.data.data)
  //       .then((res) => {
  //         setUserProfile(res);
  //       });
  //   }
  // }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  // 로그아웃
  const handleSignout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/members/logout`, {
          headers: {
            // Authorization: token,
            withCredentials: true,
          },
        })
        .then((res) => console.log(res))
        .then((res) => navigate('/'));
    }
  };

  return (
    <HeadContainer>
      <LeftSection>
        <div className="header__logo" onClick={() => handleNavigate('/')}>
          website name
        </div>
        {/* <img alt="logo_image" src="https://picsum.photos/40" onClick={() => handleNavigate('/')} /> */}
        <button className="button--default button--subtle" onClick={() => handleNavigate('/blog')}>
          Travel Logs
        </button>
      </LeftSection>
      <RightSection>
        {login ? (
          <>
            <img
              onClick={() => handleNavigate('/user/:memberId')}
              alt="profile_image"
              src={userProfile}
            />
            <button className='button--default button--subtle' onClick={handleSignout}>Sign out</button>
          </>
        ) : (
          <>
            <button className="button--default" onClick={() => handleNavigate('/login')}>
              Log In
            </button>
            <button className="button--primary" onClick={() => handleNavigate('/signup')}>
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
  position: fixed;
  display: flex;
  justify-content: space-between;
  margin: 0 50px;
  width: calc(100vw - 100px);
  height: 60px;
  z-index: 9999;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  .header__logo {
    cursor: pointer;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);

  > img {
    width: 36px;
    height: 36px;
    border-radius: 18px;
    cursor: pointer;
  }
`;
