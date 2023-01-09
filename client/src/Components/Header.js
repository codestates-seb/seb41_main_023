import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Header = ({ login }) => {
  const navigate = useNavigate();

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

  return (
    <HeadContainer>
      <LeftSection>
        <button onClick={() => handleNavigate("/")}>로고</button>
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

  > button {
    cursor: pointer;
  }
`;
const RightSection = styled.div`
  display: flex;

  > * {
    cursor: pointer;
  }

  > img {
    margin: 15px 0 10px 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  > button {
    white-space: nowrap;
    border: none;
    border-radius: 0;
    margin: 0 15px;
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
