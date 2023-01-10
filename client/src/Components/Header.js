import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Header = ({ login }) => {
  const [token, setToken] = useState();
  const [memberId, setMemberId] = useState();
  const navigate = useNavigate();

  //토큰 설정
  // useEffect(() => {
  //   if (cookies.accessToken) {
  //     setToken(cookies.accessToken.token);
  //   }
  // }, []);

  //memberId 설정

  //프로필 이미지 axios 요청
  //  useEffect(() => {
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
  //  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSignout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/members/logout`, {
          headers: {
            // Authorization: token,
            withCredentials: true,
          },
        })
        .then((res) => console.log(res))
        .then((res) => navigate("/"));
    }
  };

  return (
    <HeadContainer>
      <LeftSection>
        <img
          alt="logo_image"
          src="https://picsum.photos/40"
          onClick={() => handleNavigate("/")}
        />
        <button onClick={() => handleNavigate("/blog")}>Travel Logs</button>
      </LeftSection>
      <RightSection>
        {login ? (
          <>
            <img
              onClick={() => handleNavigate("/user/:memberId")}
              alt="profile_image"
              src="https://picsum.photos/50"
            />
            <button onClick={handleSignout}>Sign out</button>
          </>
        ) : (
          <>
            <button
              className="login_button"
              onClick={() => handleNavigate("/login")}
            >
              Log In
            </button>
            <button
              className="signup_button"
              onClick={() => handleNavigate("/signup")}
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
  /* background-color: slategray; */

  display: flex;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  margin: 20px;
  cursor: pointer;

  > img {
    margin-right: 15px;
    border-radius: 50%;
  }

  > button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 13px;
    letter-spacing: 1px;

    padding: 1px 0;

    &:hover {
      text-decoration: underline;
      text-underline-position: under;
    }
  }
`;
const RightSection = styled.div`
  display: flex;

  > * {
    cursor: pointer;
  }

  > img {
    margin: 20px 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  > button {
    white-space: nowrap;
    border: none;
    border-radius: 0;
    margin: 20px 15px;
    padding: 1px 0;

    font-size: 12px;
    letter-spacing: 1px;
    text-decoration: none;
    text-transform: uppercase;

    background-color: transparent;
    &:hover {
      text-decoration: underline;
      text-underline-position: under;
    }
  }
`;
