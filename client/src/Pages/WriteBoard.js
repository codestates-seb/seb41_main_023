import styled from 'styled-components';

import Header from '../Components/Header';
import Footer from './Footer';
import MyTrips from '../Components/user/MyTrips';
import MyLogs from '../Components/user/MyLogs';

const WriteBoard = () => {
  return (
    <WriteBoardContainer>
      <Header login={true} />
      <Main>
        <div className="main__header">
          <h1>Write your travel log</h1>
          <p>Reflect your trips and share it with other travellers!</p>
        </div>
        <MyTrips mode="write" />
        <MyLogs mode="write" />
      </Main>
      <Footer />
    </WriteBoardContainer>
  );
};

export default WriteBoard;

const WriteBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  width: 100vw;
  padding: 50px;

  > .main__header {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 300px;
    padding-bottom: 50px;
    margin-bottom: 50px;

    h1 {
      margin-bottom: var(--spacing-3);
      font-size: var(--xx-large-heading-font-size);
      line-height: var(--xx-large-heading-line-height);
      font-weight: 500;
      color: var(--black);
    }

    p {
      font-size: var(--large-text-size);
      line-height: var(--large-text-line-height);
    }
  }
`;
