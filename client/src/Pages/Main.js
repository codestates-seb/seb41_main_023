import styled from "styled-components";

import Home from "../Pages/Home";
import MyTrips from "../Components/user/MyTrips";
import MyLogs from "../Components/user/MyLogs";
import Explore from "../Components/Board/Explore";
import Footer from "./Footer";

const MainContainer = styled.div`
  position: relative;
  h2 {
    margin-bottom: var(--spacing-4);
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    font-weight: 600;
    color: var(--black);
  }

`;

const Content = styled.div`
  position: relative;
  margin: 50px;
`;


const Main = () => {
  const url = "/board?page=1&size=5&tab=views";
  
  return (
    <MainContainer>
      <Home login={true} />
      <Content>
        <MyTrips mode="plan" />
        <MyLogs mode="plan" />
        <h2>Explore</h2>
        <Explore url={url} />
      </Content>
      <Footer />
    </MainContainer>
  );
};

export default Main;
