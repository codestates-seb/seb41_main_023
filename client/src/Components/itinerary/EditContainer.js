import styled from "styled-components";
import SinglePlanBox from "./SinglePlanBox";
import PlaceInputBox from "./PlaceInputBox";
import {useState} from "react";
import Budget from "../budget/Buget";
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
  border-bottom: 1px solid lightgray;
`;

const SectionHeader = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: -48px;
  padding-left: 48px;
  position: relative;
  align-items: center;
  display: flex;
  width: 100%;
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
        mainData,
    } = props;

    const [addExpenseModal, setAddExpenseModal] = useState(false);

    const singlePlanData = mainData.planDatesAndPlace;

    return (
        <Container>
            <PlanContainer>
                <Title>Add a place you want</Title>
                <PlaceInputBox
                    searchBox={searchBox}
                    setSearchBox={setSearchBox}
                    searchData={searchData}
                    setSearchData={setSearchData}
                    setInfoWindowOpen={setInfoWindowOpen}
                    setSearchedGeocode={setSearchedGeocode}
                    setCenter={setCenter}
                    singlePlanData={singlePlanData}
                />
                <Title>일정</Title>
                {singlePlanData !== null ? (
                    singlePlanData.map((singleData) => (
                        <SectionComponent
                            key={singleData.planDateId}
                        >
                            <SectionHeader>
                                <p>{moment(singleData.planDate).format('M월 D일')}</p>
                            </SectionHeader>
                            <SinglePlanBox
                                planDateId={singleData.planDateId}
                                planDate={singleData.planDate}
                                singleData={singleData}
                                searchData={searchData}
                                setSearchData={setSearchData}
                                setAddExpenseModal={setAddExpenseModal}
                            />
                        </SectionComponent>
                    ))) : null}
                <Budget
                    addExpenseModal={addExpenseModal}
                    setAddExpenseModal={setAddExpenseModal}
                />
            </PlanContainer>
        </Container>
    )
};

export default EditContainer;