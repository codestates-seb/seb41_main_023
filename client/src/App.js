import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
      <>
        <GlobalStyle />
          <div className="app">
            <Routes>
              <Route path="/" element={isLoggedIn ? <Main/> : <Home/>}/>
              <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/signup" element={<SignUpPage setIsLoggedIn={setIsLoggedIn}/>}/>
              <Route path="/user/:memberId" element={<UserProfile/>}/>
              <Route path="/user/:memberId/edit" element={<UserProfileEdit/>}/>
              <Route path="/itinerary/:itineraryId" element={<Itinerary/>}/>
              {/* <Route path="/blog" element={<Blog/>}/> */}
            </Routes>
          </div>
      </>
    );
}

export default App;
