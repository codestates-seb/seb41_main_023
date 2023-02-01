import styled from 'styled-components';

import Home from './Home';
import Footer from './Footer';
import MyTrips from '../Components/user/MyTrips';
import MyLogs from '../Components/user/MyLogs';
import Explore from '../Components/Board/Explore';
import { useState } from 'react';

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

  .title__section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
      border: 1px solid var(--light-gray-5);
      margin: 0 5px;
    }

    > .selection__tab {
      > .mode--button {
        padding: 10px 14px;
        font-weight: 500;
        background-color: transparent;
        border-radius: 3px;
        font-weight: 400;
      }

      > .mode--selected {
        background-color: var(--primary-blue-light-2);
        color: var(--dark-gray-1);
      }
    }
  }
`;

const Content = styled.div`
  position: relative;
  margin: 50px;
`;

const Main = () => {
  const [mode, setMode] = useState('boardId');
  const TopMove = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainContainer>
      <Home login={true} />
      <Content>
        <MyTrips mode="plan" />
        <MyLogs mode="plan" />
        <div className={'title__section'}>
          <h2>Explore</h2>
          <div className={'selection__tab'}>
            <button
              className={
                mode === 'boardId'
                  ? 'mode--selected mode--button'
                  : 'mode--button'
              }
              onClick={() => setMode('boardId')}
            >
              최신순
            </button>
            <button
              className={
                mode === 'likes'
                  ? 'mode--selected mode--button'
                  : 'mode--button'
              }
              onClick={() => setMode('likes')}
            >
              좋아요순
            </button>
            <button
              className={
                mode === 'views'
                  ? 'mode--selected mode--button'
                  : 'mode--button'
              }
              onClick={() => setMode('views')}
            >
              조회수순
            </button>
          </div>
        </div>
        <Explore mode={mode} />
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
