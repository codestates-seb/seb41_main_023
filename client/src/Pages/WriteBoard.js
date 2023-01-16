import styled from "styled-components";

import Header from "../Components/Header";
import MyTrips from "../Components/user/MyTrips";
import MyLogs from "../Components/user/MyLogs";

const WriteBoard = () => {
  return (
    <WriteBoardContainer>
      <Header login={true} />
      <Content>
        <h1>Write your travel log</h1>
        <div>Reflect your trips and share it with other travellers!</div>
      </Content>
      <MyTrips mode="board" />
      <MyLogs mode="board" />
    </WriteBoardContainer>
  );
};

export default WriteBoard;

const WriteBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;
