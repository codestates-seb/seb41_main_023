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
          .then((res) => navigate(`/itinerary/${res.data.planId}`));
      } else {
        localStorage.setItem("plan", JSON.stringify(data));
        navigate("/login");
      }
    }
  };

  return (
    <HomeContainer className={login ? "login" : false}>
      <Header login={login || false} />
      <TopSection className={login ? "login" : false}>
        <h1>Where do you want to travel?</h1>
      </TopSection>
      <BottomSection className={login ? "login" : false}>
        <Autocomplete
          className="autocomplete"
          handleDestination={handleDestination}
          inputRef={inputRef}
        />
        <button
          className="calendarbtn"
          onClick={() => setShowCalendar(!showCalendar)}
          ref={inputCalendarRef}
        >
          {startDate} → {endDate}
        </button>
        <button
          className="submitbtn"
          onClick={() => handleSubmit(destination, startDate, endDate)}
        >
          Start Planning
        </button>
      </BottomSection>
      {showCalendar && <Calendar handleDate={handleDate} login={login} />}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &.login {
    position: relative;
  }
`;

const TopSection = styled.div`
  position: absolute;

  top: 40%;
  left: 5%;

  &.login {
    position: relative;
    left: 20px;
  }
`;
const BottomSection = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 5%;
  > * {
    margin-right: 12px;
    border-radius: 6px;
  }

  &.login {
    position: relative;
    left: 20px;
  }

  > button {
    cursor: pointer;
  }

  > button:focus {
    border-color: pink;
  }
  > .calendarbtn {
    background-color: white;
    width: 200px;
    max-height: 38px;
    color: rgba(0, 0, 0, 0.4);
    text-align: left;
    padding-left: 12px;
  }

  > .submitbtn {
    max-height: 38px;
    background-color: slategray;
    border: none;
    color: white;
    font-size: 12px;

    padding: 10px 20px;

    :hover {
      background-color: blueviolet;
    }
  }
`;
