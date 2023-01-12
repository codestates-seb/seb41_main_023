import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import Main from "./Pages/Main";
import UserProfile from "./Pages/UserProfile";
import UserProfileEdit from "./Pages/UserProfileEdit";
import Itinerary from "./Pages/Itinerary";
import { getCookie } from "./Util/Cookies";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    if(getCookie("accessToken")) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn])
  
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Main /> : <Home />} />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/user/:memberId" element={<UserProfile />} />
        <Route path="/user/:memberId/edit" element={<UserProfileEdit />} />
        <Route path="/itinerary/:itineraryId" element={<Itinerary />} />
        {/*<Route path="/blog" element={<Blog/>}/>*/}
      </Routes>
    </>
  );
}

export default App;
