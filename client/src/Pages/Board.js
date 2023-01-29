import Header from '../Components/Header';
import Autocomplete from '../Components/AutoComplete';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../Util/Cookies';
import Explore from '../Components/Board/Explore';
import bgImg from '../images/login_background-image.jpg';

const Board = () => {
  const [login, setLogin] = useState(false);
  const [destination, setDestination] = useState('');
  const [searches, setSearches] = useState(false);
  const [mode, setMode] = useState('boardId');
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie('accessToken')) {
      setLogin(true);
    }
  }, []);

  const handleSearch = () => {
    setSearches(true);
  };

  const handleDestination = destination => {
    setDestination(destination);
  };

  const TopMove = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWrite = () => {
    if (login) {
      navigate('/board/plan');
    } else {
      if (
        window.confirm(
          '게시글 작성은 로그인 후에 사용 가능합니다. 로그인하시겠습니까?',
        )
      )
        navigate('/login');
    }
  };

  return (
    <LogContainer>
      <Header login={login} />
      <TopContainer>
        <div className="top__container">
          <div className="top__content">
            <h1>Explore travel logs and itineraries</h1>
            <Autocomplete
              handleDestination={handleDestination}
              setSearches={setSearches}
              handleSearch={handleSearch}
            />
          </div>
        </div>
      </TopContainer>
      <MainContainer>
        <div className="main__header">
          <h2>Explore</h2>
          <div className={'selection__tab'}>
            <button
              className={`button--default button--subtle`}
              onClick={() => {
                window.location.reload();
                setMode('boardId');
              }}
            >
              최신순
            </button>
            <button
              className={`button--default button--subtle`}
              onClick={() => {
                setMode('likes');
              }}
            >
              좋아요순
            </button>
            <button
              className={`button--default button--subtle`}
              onClick={() => {
                setMode('views');
              }}
            >
              조회수순
            </button>
          </div>
          <button className="button--primary" onClick={handleWrite}>
            Write log
          </button>
        </div>
        <Explore searches={searches} destination={destination} mode={mode} />
        <button
          className="button--default button--subtle button--top"
          onClick={TopMove}
        >
          Top
        </button>
      </MainContainer>
    </LogContainer>
  );
};

export default Board;

const LogContainer = styled.div`
  position: relative;
`;

const TopContainer = styled.div`
  position: absolute;
  position: relative;
  width: 100vw;
  height: 400px;
  background-image: url(${bgImg});
  background-size: cover;
  background-position: 25% 60%;

  > .top__container {
    position: absolute;
    display: flex;
    width: 100vw;
    align-items: flex-end;
    height: 400px;
    background-color: rgba(15, 15, 15, 0.15);

    > .top__content {
      position: relative;
      margin: 0px auto;
      padding: 50px;
      width: 100%;
      min-width: 1024px;
      max-width: 1920px;
    }
  }

  h1 {
    margin-bottom: var(--spacing-4);
    font-size: var(--xx-large-heading-font-size);
    line-height: var(--xx-large-heading-line-height);
    font-weight: 500;
    color: var(--white);
  }
`;

const MainContainer = styled.div`
  position: relative;
  margin: 50px;

  > .main__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-4);

    .selection__tab {
      margin-left: 75%;
      button {
        margin: 0 5px;
        border: 1px solid var(--light-gray-5);
      }
    }
  }

  h2 {
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
`;

// const MainContent = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   row-gap
// `;
