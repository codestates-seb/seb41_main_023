import styled from "styled-components";

import Home from "../Pages/Home";
import MyTrips from "../Components/user/MyTrips";
import MyLogs from "../Components/user/MyLogs";
import Explore from "../Components/Board/Explore";
import Footer from "./Footer";
import {topScrollBtn} from "../images/topScroll";

const MainContainer = styled.div`
  position: relative;

  h2 {
    margin-bottom: var(--spacing-4);
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    font-weight: 600;
    color: var(--black);
  }

  .topBtn {
    position: fixed;
    bottom: 50px;
    right: 50px;
    background-color: var(--primary-blue-light-1);
    font-size: 24px;
    padding: 6px;
    border-radius: 50%;
  }
`;

const Content = styled.div`
  position: relative;
  margin: 50px;
`;


const Main = () => {
    const TopMove = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return (
        <MainContainer>
            <Home login={true}/>
            <Content>
                <MyTrips mode="plan"/>
                <MyLogs mode="plan"/>
                <h2>Explore</h2>
                <Explore/>
            </Content>
            <Footer/>
            <button className="topBtn" onClick={TopMove}>
                {topScrollBtn}
            </button>
        </MainContainer>
    );
};

export default Main;
