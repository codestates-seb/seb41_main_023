import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Main from "./Pages/Main";
import UserProfile from "./Pages/UserProfile";
import UserProfileEdit from "./Pages/UserProfileEdit";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Main /> : <Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />/
      <Route path="/user/:memberId" element={<UserProfile />} />
      <Route path="/user/:memberId/edit" element={<UserProfileEdit />} />
      <Route path="/itinerary/:itineraryId" element={<Itinerary />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}

export default App;
