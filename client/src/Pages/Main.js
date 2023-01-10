import styled from "styled-components";

import Home from "../Pages/Home";
import MyTrips from "../Components/user/MyTrips";
import MyLogs from "../Components/user/MyLogs";

// import Budget from "../Components/Buget";

const MainContainer = styled.div``;

const Content = styled.div``;
const TripContainer = styled.div``;
const BlogContainer = styled.div``;
const ExploreContainer = styled.div``;

const Main = () => {
  return (
    <MainContainer>
      <Home login={true} />
      <Content>
        <TripContainer>
          <MyTrips />
        </TripContainer>
        <BlogContainer>
          <MyLogs />
        </BlogContainer>
        <ExploreContainer>
          <h2>Explore</h2>
        </ExploreContainer>
        {/* <Budget /> */}
      </Content>
    </MainContainer>
  );
};

export default Main;
