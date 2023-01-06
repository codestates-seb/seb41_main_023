import styled from "styled-components";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Components/Header";
import Calendar from "../Components/Calendar";

const HomeContainer = styled.div`
  height: 100vh;
`;

const Top_Section = styled.div``;
const Bottom_Section = styled.div`
  display: flex;

  > input {
    width: 300px;
    padding: 10px;
  }

  > button {
    cursor: pointer;
  }
  > .calendar {
    background-color: white;
  }
`;
const Home = () => {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState("Start date");
  const [endDate, setEndDate] = useState("End date");

  const handleDate = (date) => {
    setStartDate(moment(date[0].startDate).format("MMM Do YY"));
    setEndDate(moment(date[0].endDate).format("MMM Do YY"));
  };

  return (
    <HomeContainer>
      <Header />
      <Top_Section>
        <div>Where do you want to travel?</div>
      </Top_Section>
      <Bottom_Section>
        <input
          type="text"
          placeholder="📍 Search Destination ex. Seoul, Busan..."
        ></input>
        <button
          className="calendar"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {startDate} → {endDate}
        </button>
        <button onClick={() => navigate("/itinerary/:itineraryId")}>
          Start Planning
        </button>
      </Bottom_Section>
      {showCalendar && <Calendar handleDate={handleDate} />}
    </HomeContainer>
  );
};

export default Home;
