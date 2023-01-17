import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";

import { getCookie } from "./Util/Cookies";

import Home from "./Pages/Home";
import Main from "./Pages/Main";
import Itinerary from "./Pages/Itinerary";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import UserProfile from "./Pages/UserProfile";
import UserProfileEdit from "./Pages/UserProfileEdit";
import WriteBoard from "./Pages/WriteBoard";
import WriteSingleBoard from "./Pages/WriteSingleBoard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (getCookie("accessToken")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Main /> : <Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user/:memberId" element={<UserProfile />} />
        <Route path="/user/:memberId/edit" element={<UserProfileEdit />} />
        <Route path="/itinerary/:itineraryId" element={<Itinerary />} />
        {/*  /!*서비스 이용자들의 모든 게시글이 노출되는 전체 게시글 목록 페이지*!/*/}
        {/*<Route path="/board" element={<Board/>}/>*/}
        {/*  /!*게시글 작성 시작을 위한 여행선택 페이지*!/*/}
        <Route path="/board/plan" element={<WriteBoard/>}/>
        {/*  /!*특정 게시글 조회한 페이지*!/*/}
        {/*<Route path="/board/:boardId" element={<SingleBoard/>}/>*/}
        {/*  /!*게시글 수정 페이지*!/*/}
        {/*<Route path="/board//edit/:boardId" element={<EditSingleBoard/>}/>*/}
        {/*  /!*게시글 작성 페이지*!/*/}
        <Route path="/board/plan/:planId" element={<WriteSingleBoard/>}/>
      </Routes>
    </>
  );
}

export default App;
