import styled from "styled-components";
import SinglePlanBox from "./SinglePlanBox";
import PlaceInputBox from "./PlaceInputBox";
import {useEffect, useState} from "react";
import Budget from "../budget/Buget";
import axios from "axios";
import {useParams} from "react-router-dom";
import {getCookie} from "../../Util/Cookies";
import moment from "moment/moment";

const Container = styled.div`
  position: relative;
  word-wrap: break-word;
  min-width: 0;
  flex-grow: 1;
  max-width: 100%;
  min-height: calc(100% - 200px);
  width: calc(100% - 30px);
  margin-top: 240px;
  margin-left: 50px;
  overflow-y: scroll;
`;

const PlanContainer = styled.div`
  margin-left: 50px;
  width: 90%;
  position: relative;
`;

const Title = styled.h2`
  margin-top: 24px;
  margin-bottom: 24px;
  align-items: center;
  display: flex;
  font-size: 36px;
  line-height: 1 !important;
  font-weight: 700 !important;
  margin-right: auto !important;
`;

const SectionComponent = styled.div`
  box-sizing: border-box;
`;

const EditContainer = (props) => {
    const {
        setCenter,
        searchBox,
        setSearchBox,
        searchData,
        setSearchData,
        setSearchedGeocode,
        setInfoWindowOpen,
        startDate,
        setStartDate,
        endDate,
        setEndDate
    } = props;

    const {itineraryId} = useParams();

    const [addExpenseModal, setAddExpenseModal] = useState(false);
    const [date, setDate] = useState([])
    const [planData, setPlanData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/plans/${itineraryId}`, {
            headers: {
                Authorization: getCookie('accessToken'),
                withCredentials: true
            }
        })
            .then((res) => {
                // const dateArr = res.data.data.planDates.map((element) => element.planDate);
                // const formattedDateArr = dateArr.map((date) => moment(date).format('M월 D일'));
                // setDate(formattedDateArr);
                console.log(res.data.data.planDates)
                setPlanData(res.data.data.planDates);
            })
    }, [])

    return (
        <Container>
            <PlanContainer>
                <Title>일정</Title>
                {planData.map((singleData) => (
                    <SectionComponent
                        key={singleData.planDateId}
                    >
                        <SinglePlanBox
                            planDateId={singleData.planDateId}
                            planDate={singleData.planDate}
                            searchData={searchData}
                            setSearchData={setSearchData}
                            setAddExpenseModal={setAddExpenseModal}
                        />
                        <PlaceInputBox
                            planDateId={singleData.planDateId}
                            searchBox={searchBox}
                            setSearchBox={setSearchBox}
                            searchData={searchData}
                            setSearchData={setSearchData}
                            setInfoWindowOpen={setInfoWindowOpen}
                            setSearchedGeocode={setSearchedGeocode}
                            setCenter={setCenter}
                        />
                    </SectionComponent>
                ))}
                <Budget
                    addExpenseModal={addExpenseModal}
                    setAddExpenseModal={setAddExpenseModal}
                />
            </PlanContainer>
        </Container>
    )
};

export default EditContainer;