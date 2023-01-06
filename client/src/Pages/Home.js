import styled from "styled-components";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Components/Header";
import Calendar from "../Components/Calendar";
import Autocomplete from "../Components/AutoComplete";

const Home = () => {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState("Start date");
  const [endDate, setEndDate] = useState("End date");
  const [destination, setDestination] = useState("");

  const handleDate = (date) => {
    setStartDate(moment(date[0].startDate).format("MMM Do YY"));
    setEndDate(moment(date[0].endDate).format("MMM Do YY"));
  };

  const handleDestination = (destination) => {
    setDestination(destination);
  };

  /**
   *  @param {string} destination 목적지
   *  @param {string} startDate 시작 날짜
   *  @param {string} endDate 종료 날짜
   */

  const handleSubmit = (destination, startDate, endDate) => {
    console.log(destination, startDate, endDate);
    //장소, 날짜를 입력 받아 post 요청?
    //전송 후 /itinerary/:itineraryId 로 이동
  };

  return (
    <HomeContainer>
      <Header />
      <TopSection>
        <div>Where do you want to travel?</div>
      </TopSection>
      <BottomSection>
        <Autocomplete handleDestination={handleDestination} />
        <button
          className="calendar"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {startDate} → {endDate}
        </button>
        <button onClick={() => handleSubmit(destination, startDate, endDate)}>
          Start Planning
        </button>
      </BottomSection>
      {showCalendar && <Calendar handleDate={handleDate} />}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  height: 100vh;
`;

const TopSection = styled.div``;
const BottomSection = styled.div`
  display: flex;

  > button {
    cursor: pointer;
  }
  > .calendar {
    background-color: white;
  }
`;
