import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeCookie } from "../Util/Cookies";
import { getCookie } from "../Util/Cookies";
import { postData } from "../Util/api.js";

const Header = ({ login }) => {
  const navigate = useNavigate();

  const token = getCookie("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const [userProfile, setUserProfile] = useState("https://picsum.photos/50");

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
  const handleSignout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      await postData("/members/logout", {
        accessToken: token,
        refreshToken: refreshToken,
      }).then((res) => {
        removeCookie("accessToken");
        removeCookie("memberId");
        localStorage.removeItem("refreshToken");
        window.location.replace("/");
      });
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
