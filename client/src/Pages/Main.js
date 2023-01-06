import Header from "../Components/Header";
import styled from "styled-components";

const MainContainer = styled.div`
  height: 100vh;
  background-color: aliceblue;
`;

const Main = () => {
  return (
    <MainContainer>
      <Header />
    </MainContainer>
  );
};

export default Main;
