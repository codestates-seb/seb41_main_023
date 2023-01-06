import {useState} from "react";
import {Route, Routes} from "react-router-dom";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Routes>
            <Route path="/" element={isLoggedIn ? <Main/> : <Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/user/:memberId" element={<UserProfile/>}/>
            <Route path="/user/:memberId/edit" element={<UserProfileEdit/>}/>
            <Route path="/itinerary/:itineraryId" element={<Itinerary/>}/>
            {/*<Route path="/blog" element={<Blog/>}/>*/}
        </Routes>
    );
}

export default App;
