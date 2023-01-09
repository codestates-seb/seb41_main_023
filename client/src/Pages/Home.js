import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import { useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import Header from "../Components/Header";
import Calendar from "../Components/Calendar";
import Autocomplete from "../Components/AutoComplete";

const Home = ({ login }) => {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState("Start date");
  const [endDate, setEndDate] = useState("End date");
  const [destination, setDestination] = useState("");

  const inputRef = useRef([]);
  const inputCalendarRef = useRef([]);

  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [token, setIsToken] = useState();

  //토큰 설정
  // useEffect(() => {
  //   if (cookies.accessToken) {
  //     setIsToken(cookies.accessToken.token);
  //   }
  // }, []);

  const handleDate = (date) => {
    setStartDate(moment(date[0].startDate).format("YYYY-MM-DD"));
    setEndDate(moment(date[0].endDate).format("YYYY-MM-DD"));
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
    // console.log(destination, startDate, endDate);

    //장소가 입력되지 않았을 때 포커싱
    if (destination.length <= 1) {
      inputRef.current.focus();
    } else if (startDate === "Start date" || endDate === "End date") {
      inputCalendarRef.current.focus();
    } else {
      const data = {
        cityName: destination,
        startDate: startDate,
        endDate: endDate,
      };
      if (login) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/plans`, {
            headers: {
              // Authorization: token,
              withCredentials: true,
            },
            data: data,
          })
          .then((res) => console.log(res))
          .then((res) => navigate(`/itinerary/${res.data.planId}`));
      } else {
        localStorage.setItem("plan", JSON.stringify(data));
        navigate("/login");
      }
    }
  };

  return (
    <HomeContainer>
      <Header login={login || false} />
      <TopSection>
        <h1>Where do you want to travel?</h1>
      </TopSection>
      <BottomSection>
        <Autocomplete
          handleDestination={handleDestination}
          inputRef={inputRef}
        />
        <button
          className="calendar"
          onClick={() => setShowCalendar(!showCalendar)}
          ref={inputCalendarRef}
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

const HomeContainer = styled.div``;

const TopSection = styled.div``;
const BottomSection = styled.div`
  display: flex;

  > button {
    cursor: pointer;
  }

  > button:focus {
    border-color: pink;
  }
  > .calendar {
    background-color: white;
  }
`;
