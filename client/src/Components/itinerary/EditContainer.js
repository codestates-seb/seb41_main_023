import styled from "styled-components";
import SinglePlanBox from "./SinglePlanBox";
import PlaceInputBox from "./PlaceInputBox";
import {useState} from "react";
import Budget from "../budget/Buget";

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
        setInfoWindowOpen
    } = props;

    const [addExpenseModal, setAddExpenseModal] = useState(false);

    return (
        <Container>
            <PlanContainer>
                <Title>Itinerary</Title>
                <SectionComponent>
                    <SinglePlanBox
                        searchData={searchData}
                        setSearchData={setSearchData}
                        setAddExpenseModal={setAddExpenseModal}
                    />
                    <PlaceInputBox
                        searchBox={searchBox}
                        setSearchBox={setSearchBox}
                        searchData={searchData}
                        setSearchData={setSearchData}
                        setInfoWindowOpen={setInfoWindowOpen}
                        setSearchedGeocode={setSearchedGeocode}
                        setCenter={setCenter}
                    />
                </SectionComponent>
                <Budget
                    addExpenseModal={addExpenseModal}
                    setAddExpenseModal={setAddExpenseModal}
                />
            </PlanContainer>
        </Container>
    )
};

export default EditContainer;