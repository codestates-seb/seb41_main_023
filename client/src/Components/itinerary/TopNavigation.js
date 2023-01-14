import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getCookie} from "../../Util/Cookies";
import moment from "moment";
import Calendar from "../Calendar";

const TopNavBar = styled.nav`
  border-bottom: 1px solid #e9ecef;
  margin: 20px;
  position: fixed;
  display: flex;
  width: 910px;
  height: 200px;
  left: 0;
  right: 0;
  top: 0;
  padding: 0;
  z-index: 50;
  background-color: white !important;
  flex-flow: column nowrap;
`;

const LogoButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  cursor: pointer;

  img {
    margin-right: 15px;
    border-radius: 50%;
  }
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  margin: 0 20px;
  padding: 5px 10px;
  border-radius: 2rem;
  background-color: #4F4F4F;
  color: white;
`;

const TripTitleContainer = styled.div`
  height: calc(200px - 80px);
  width: auto;

  h1 {
    margin-top: 70px;
  }

  p {
    margin-top: 20px;
  }
`;

const TopNavigation = (props) => {
    const {itineraryId} = useParams();
    console.log(itineraryId);
    const navigate = useNavigate();
    const token = getCookie('accessToken');
    const [showCalendar, setShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState("Start date");
    const [endDate, setEndDate] = useState("End date");
    const [mainData, setMainData] = useState({
        cityName: '',
        planTitle: '',
        startDate: startDate,
        endDate: endDate,
    });
    const handleDate = (date) => {
        setStartDate(moment(date[0].startDate).format("YYYY-MM-DD"));
        setEndDate(moment(date[0].endDate).format("YYYY-MM-DD"));
    };

    const handleCalendar = () => {
        setShowCalendar(prevState => !prevState);
    }

    const changeDateHandler = () => {
        axios.patch(`${process.env.REACT_APP_API_URL}/plans/${itineraryId}`,
            {
                startDate,
                endDate
            },
            {
                headers: {
                    Authorization: token,
                    withCredentials: true,
                }
            }
        )
            .then((res) => {
                console.log(res.data.data)
                setMainData({
                    ...mainData,
                    startDate: startDate,
                    endDate: endDate
                })
            })
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/plans/${itineraryId}`,
            {
                headers: {
                    Authorization: token,
                    withCredentials: true,
                }
            }
        )
            .then((res) => {
                setMainData({
                    cityName: res.data.data.cityName,
                    planTitle: res.data.data.planTitle,
                    startDate: res.data.data.startDate,
                    endDate: res.data.data.endDate,
                })
            })
    }, [])

    return (
        <TopNavBar>
            <LogoButtonContainer>
                <Logo>
                    <img
                        alt="logo_image"
                        src="https://picsum.photos/40"
                        onClick={() => navigate("/")}
                    />
                </Logo>
                <SaveButton>Save Trip</SaveButton>
            </LogoButtonContainer>
            <TripTitleContainer>
                <h1>{mainData.planTitle}</h1>
                <button
                    onClick={handleCalendar}
                >{moment(mainData.startDate).format('M월 D일')} ~ {moment(mainData.endDate).format('M월 D일')}</button>
                {showCalendar ? (<Calendar
                    handleDate={handleDate}
                    // onKeyPress={(event) => changeDateHandler(event)}
                />) : null}
                <button
                    onClick={changeDateHandler}
                >날짜 변경
                </button>
            </TripTitleContainer>
        </TopNavBar>
    )
};

export default TopNavigation;