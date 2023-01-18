import styled from "styled-components";

import Home from "../Pages/Home";
import MyTrips from "../Components/user/MyTrips";
import MyLogs from "../Components/user/MyLogs";
import Explore from "../Components/Board/Explore";
import Footer from "./Footer";

const MainContainer = styled.div`
  position: relative;
`;

const Content = styled.div`
  position: relative;
  margin: 50px;
`;

const Main = () => {
  return (
    <MainContainer>
      <Home login={true} />
      <Content>
        <MyTrips mode="plan" />
        <MyLogs mode="plan" />
        <Explore />
      </Content>
      <Footer />
    </MainContainer>
  );
};

export default Main;
