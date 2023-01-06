import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = ({ login }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSignout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      //로그아웃 요청
      navigate("/");
    }
  };

  return (
    <HeadContainer>
      <LeftSection>
        <button onClick={() => handleNavigate("/")}>로고</button>
        <button onClick={() => handleNavigate("/blog")}>Travel Logs</button>
      </LeftSection>
      <RightSection>
        {login ? (
          <>
            <button onClick={() => handleNavigate("/user/:memberId")}>
              프로필 이미지
            </button>
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
  background-color: slategray;

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

  > button {
    cursor: pointer;
  }
`;
