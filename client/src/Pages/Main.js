import styled from 'styled-components';

import Home from '../Pages/Home';
import MyTrips from '../Components/user/MyTrips';
import MyLogs from '../Components/user/MyLogs';

// import Budget from "../Components/budget/Buget";

const MainContainer = styled.div`
  position: relative;

  & .button--default {
    /* color: var(--white); */
  }
`;

const Content = styled.div`
  position: relative;
  margin: 50px;
`;

const ExploreContainer = styled.div`
  position: relative;
  margin-bottom: 50px;

  h2 {
    margin-bottom: var(--spacing-4);
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    font-weight: 600;
    color: var(--black);
  }
`;

const Main = () => {
  return (
    <MainContainer>
      <Home login={true} />
      <Content>
        <MyTrips />
        <MyLogs />
        <ExploreContainer>
          <h2>Explore</h2>
        </ExploreContainer>
        {/* <Budget /> */}
      </Content>
    </MainContainer>
  );
};

export default Main;
