import styled from "styled-components";

import Home from "../Pages/Home";
import MyTrips from "../Components/MyTrips";

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
          <h2>My logs</h2>
        </BlogContainer>
        <ExploreContainer>
          <h2>Explore</h2>
        </ExploreContainer>
      </Content>
    </MainContainer>
  );
};

export default Main;
