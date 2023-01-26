import styled from "styled-components";

import Home from "./Home";
import Footer from "./Footer";
import MyTrips from "../Components/user/MyTrips";
import MyLogs from "../Components/user/MyLogs";
import Explore from "../Components/Board/Explore";

const MainContainer = styled.div`
  position: relative;
  
  h2 {
    margin-bottom: var(--spacing-4);
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    font-weight: 600;
    color: var(--black);
  }

  .button--top {
    position: fixed;
    bottom: 50px;
    right: 50px;
    padding: 0;
    width: var(--spacing-5);
    height: var(--spacing-5);
    border-radius: 50%;
    background-color: transparent;
    font-weight: 500;
    transition: all 0.2s ease-in;

    &:hover {
      background-color: var(--primary-blue-bright);
      color: var(--white);
    }
  }
`;

const Content = styled.div`
  position: relative;
  margin: 50px;
`;

const Main = () => {
  const TopMove = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MainContainer>
      <Home login={true} />
      <Content>
        <MyTrips mode="plan" />
        <MyLogs mode="plan" />
        <h2>Explore</h2>
        <Explore />
      </Content>
      <Footer />
      <button
        className="button--default button--subtle button--top"
        onClick={TopMove}
      >
        Top
      </button>
    </MainContainer>
  );
};

export default Main;
