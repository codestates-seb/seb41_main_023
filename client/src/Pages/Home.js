import axios from "axios";
import dayjs from "dayjs";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../Util/Cookies";

import Header from "../Components/Header";
import Calendar from "../Components/Calendar";
import Autocomplete from "../Components/AutoComplete";

import logOutBgImg from "../images/logged-out_background-image.jpg";
import logInBgImg from "../images/login_background-image.jpg";

const Home = ({ login }) => {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState("Start date");
  const [endDate, setEndDate] = useState("End date");
  const [destination, setDestination] = useState("");

  const inputRef = useRef([]);
  const inputCalendarRef = useRef([]);
  const calenderRef = useRef();
  const token = getCookie("accessToken");

  //달력 외부 영역 클릭 시 닫힘
  const handleClickOutside = (e) => {
    if (showCalendar && !calenderRef.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    if (showCalendar)
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const handleDate = (date) => {
    setStartDate(dayjs(date[0].startDate).format("YYYY-MM-DD"));
    setEndDate(dayjs(date[0].endDate).format("YYYY-MM-DD"));
  };

  const handleDestination = (destination) => {
    setDestination(destination);
  };

  /**
   *  @param {string} destination 목적지
   *  @param {string} startDate 시작 날짜
   *  @param {string} endDate 종료 날짜
   */

  // 일정 생성 요청
  const handleSubmit = async (destination, startDate, endDate) => {
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
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/plans`,
            {
              cityName: destination,
              startDate: startDate,
              endDate: endDate,
            },
            {
              headers: {
                Authorization: token,
                withCredentials: true,
              },
            }
          )
          .then((res) => navigate(`/itinerary/${res.data.data.planId}`));
      } else {
        localStorage.setItem("plan", JSON.stringify(data));
        navigate("/login");
      }
    }
  };

  return (
    <HomeContainer className={login ? "login" : false}>
      <Header className="header" login={login || false} />
      <Main className={login ? "login" : false}>
        <Content className={login ? "login" : false}>
          <TopSection className={login ? "login" : false}>
            <h1>Where do you want to travel?</h1>
          </TopSection>
          <BottomSection>
            <Autocomplete
              className="autocomplete"
              handleDestination={handleDestination}
              inputRef={inputRef}
            />
            <div className="calendar__input-container">
              <div className="calendar__input">
                <div className="svg-icon--20">
                  <svg viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      fill="currentColor"
                      d="M12 2c0-.556-.448-1-1-1-.556 0-1 .448-1 1H6c0-.556-.448-1-1-1-.556 0-1 .448-1 1h-.998C2.456 2 2 2.449 2 3.002v9.996C2 13.544 2.449 14 3.002 14h9.996c.546 0 1.002-.449 1.002-1.002V3.002C14 2.456 13.551 2 12.998 2H12zm2.006-2C15.107 0 16 .895 16 1.994v12.012A1.995 1.995 0 0 1 14.006 16H1.994A1.995 1.995 0 0 1 0 14.006V1.994C0 .893.895 0 1.994 0h12.012zM7.505 4h.99c.279 0 .505.214.505.505v.99A.497.497 0 0 1 8.495 6h-.99A.497.497 0 0 1 7 5.495v-.99C7 4.226 7.214 4 7.505 4zm3 0h.99c.279 0 .505.214.505.505v.99a.497.497 0 0 1-.505.505h-.99A.497.497 0 0 1 10 5.495v-.99c0-.279.214-.505.505-.505zm-6 3h.99c.279 0 .505.214.505.505v.99A.497.497 0 0 1 5.495 9h-.99A.497.497 0 0 1 4 8.495v-.99C4 7.226 4.214 7 4.505 7zm3 0h.99c.279 0 .505.214.505.505v.99A.497.497 0 0 1 8.495 9h-.99A.497.497 0 0 1 7 8.495v-.99C7 7.226 7.214 7 7.505 7zm3 0h.99c.279 0 .505.214.505.505v.99a.497.497 0 0 1-.505.505h-.99A.497.497 0 0 1 10 8.495v-.99c0-.279.214-.505.505-.505zm-6 3h.99c.279 0 .505.214.505.505v.99a.497.497 0 0 1-.505.505h-.99A.497.497 0 0 1 4 11.495v-.99c0-.279.214-.505.505-.505zm3 0h.99c.279 0 .505.214.505.505v.99a.497.497 0 0 1-.505.505h-.99A.497.497 0 0 1 7 11.495v-.99c0-.279.214-.505.505-.505z"
                    ></path>
                  </svg>
                </div>
                <div
                  className="calendarbtn"
                  onClick={() => setShowCalendar(!showCalendar)}
                  ref={inputCalendarRef}
                >
                  <span>{startDate}</span>
                  <span className="calendar__seperator">|</span>
                  <span>{endDate}</span>
                </div>
              </div>
            </div>
            <button
              className="button--primary button--primary-large submitbtn"
              onClick={() => handleSubmit(destination, startDate, endDate)}
            >
              Start Planning
            </button>
          </BottomSection>
          {showCalendar && (
            <Calendar
              calenderRef={calenderRef}
              handleDate={handleDate}
              login={login}
            />
          )}
        </Content>
      </Main>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  position: absolute;
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${logOutBgImg});
  background-size: cover;

  &.login {
    max-height: 400px;
    background-image: url(${logInBgImg});
    background-size: cover;
    background-position: 25% 60%;
  }

  & .button--default:hover {
    background-color: white;
  }

  & .button--default:active {
    background-color: var(--light-gray-2);
  }
`;

const Main = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;

  &.login {
    align-items: flex-end;
    max-height: 400px;
    background-color: rgba(15, 15, 15, 0.15);
  }
`;

const Content = styled.div`
  position: relative;
  margin: 0px auto;
  padding: 50px;
  width: 100%;
  min-width: 1024px;
  max-width: 1920px;
`;

const TopSection = styled.div`
  margin-bottom: var(--spacing-4);
  max-width: 75%;

  h1 {
    font-size: var(--xx-large-heading-font-size);
    line-height: var(--xx-large-heading-line-height);
    font-weight: 500;
    color: var(--black);
  }

  &.login {
    h1 {
      color: var(--white);
    }
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: left;
  align-items: flex-start;

  & > * {
    display: inline-block;
  }

  & > :not(:first-child) {
    margin-left: var(--spacing-2);
  }

  .calendar__input-container {
    position: relative;
    max-width: 300px;
    flex: 1 1 0%;

    .calendar__input {
      padding: 15px 12px;
      min-width: 280px;
      background-color: white;
      border: 1px solid var(--light-gray-4);
      border-radius: 3px;

      > .svg-icon--20 {
        margin-left: 0;
      }

      > .calendarbtn {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        margin: -15px 0;
        padding-left: 42px;
        background-color: transparent;
        cursor: pointer;

        & span {
          font-size: var(--large-text-size);
          line-height: 18.5px;
        }
      }

      .calendar__seperator {
        color: var(--light-gray-4);
      }
    }
  }
`;
