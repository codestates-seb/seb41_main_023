import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeadContainer = styled.div`
  width: 100vw;
  height: 5vh;
  background-color: slategray;

  display: flex;
  justify-content: space-between;
`;

const Left_Section = styled.div`
  display: flex;
  margin: 20px;

  > button {
    cursor: pointer;
  }
`;
const Right_Section = styled.div`
  display: flex;

  > button {
    cursor: pointer;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <HeadContainer>
      <Left_Section>
        <button onClick={() => handleNavigate("/")}>로고</button>
        <button onClick={() => handleNavigate("/blog")}>Travel Logs</button>
      </Left_Section>
      <Right_Section>
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
      </Right_Section>
    </HeadContainer>
  );
};

export default Header;
