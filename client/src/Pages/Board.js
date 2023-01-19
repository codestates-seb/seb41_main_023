import Header from "../Components/Header";
import Autocomplete from "../Components/AutoComplete";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../Util/Cookies";
import Explore from "../Components/Board/Explore";

const Board = () => {
  const [login, setLogin] = useState(false);
  const [destination, setDestination] = useState("");
  const [searchs, setSearchs] = useState(false);

  const navigate = useNavigate();

  const url = searchs
    ? `/board/plan?city=${destination}&tab=boardId`
    : "/board?page=1&size=100&tab=views";

  useEffect(() => {
    if (getCookie("accessToken")) {
      setLogin(true);
    }
  }, []);

  const handleSearch = () => {
    setSearchs(true);
  };

  const handleDestination = (destination) => {
    setDestination(destination);
  };

  const TopMove = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWrite = () => {
    if (login) {
      navigate("/board/plan");
    } else {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
    }
  };

  return (
    <BlogPageStyle>
      <Header login={login} />

      <TopStyle>
        <div className="text">Explore travel logs and itineraries</div>
        <BlockStyle>
          <Autocomplete
            handleDestination={handleDestination}
            setSearchs={setSearchs}
            handleSearch={handleSearch}
          />
          <button className="sbtn" onClick={handleSearch}>
            submit
          </button>
        </BlockStyle>
      </TopStyle>

      <MarginStyle>
        <Style>
          <h2>Explore</h2>
          <button className="wbtn" onClick={handleWrite}>
            Write travel log
          </button>
        </Style>

        <MainStyle>
          <Explore url={url} searchs={searchs} />
          <button className="tbtn" onClick={TopMove}>
            top
          </button>
        </MainStyle>
      </MarginStyle>
    </BlogPageStyle>
  );
};

export default Board;

const BlogPageStyle = styled.div`
  width: 100vw;
  height: 100vh;

  .tbtn {
    position: fixed;
    bottom: 50px;
    right: 100px;
    background-color: cyan;
    font-size: 24px;
    padding: 6px;
  }
`;

const TopStyle = styled.div`
  width: 100vw;
  height: 300px;
  margin-top: 60px;
  background-color: lightgray;

  .text {
    display: inline-block;
    margin: 180px 0 20px 50px;
  }

  .autocomplete {
    display: inline-block;
    margin-left: 50px;
  }

  .sbtn {
    display: inline-block;
    font-size: 26px;
    padding: 12px;
  }
`;

const Style = styled.div`
  display: flex;
  justify-content: space-between;

  h2 {
    margin-bottom: var(--spacing-4);
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    font-weight: 600;
    color: var(--black);
  }

  .wbtn {
    background-color: white;
    margin-bottom: var(--spacing-4);
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    font-weight: 600;
    color: var(--black);
  }
`;

const MainStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const BlockStyle = styled.div`
  position: block;
`;

const MarginStyle = styled.div`
  margin: 50px;
`;
