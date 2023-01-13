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
        {/*<Route path="/blog" element={<Blog/>}/>*/}
      </Routes>
    </>
  );
}

export default App;
