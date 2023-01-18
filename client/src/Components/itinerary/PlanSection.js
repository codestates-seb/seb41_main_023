import SideDateBar from "./SideDateBar";
import PlaceInputBox from "./PlaceInputBox";
import moment from "moment";
import SinglePlanBox from "./SinglePlanBox";
import AddExpense from "../budget/AddExpense";
import Budget from "../budget/Buget";
import axios from "axios";
import {getCookie} from "../../Util/Cookies";
import {useState} from "react";
import styled from "styled-components";

const PlanSection = (props) => {
    const {
        searchBox,
        setSearchBox,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        mainData,
        handleGeoCode,
        handleZoom,
        handleRefresh
    } = props;

    const [addExpenseModal, setAddExpenseModal] = useState(false);
    const [currentDate, setCurrentDate] = useState(null);
    const [currentPlace, setCurrentPlace] = useState(null);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);

    const singlePlanData = mainData.planDatesAndPlace;

    const budgetId = mainData.budget?.budgetId;

    const [budget, setBudget] = useState({});
    const [expenses, setExpenses] = useState([]);

    // 비용 추가 요청
    const handleAddExpense = (price, selectedCategory, item, placeId) => {
        console.log(price, selectedCategory, item, placeId)
        if (budget.expectedBudget < 1) {
            return alert("예산을 설정해주세요.");
        }
        if (
            budget.expectedBudget <
            parseInt(budget.totalExpenses) + parseInt(price)
        ) {
            return alert("예산을 초과하였습니다.");
        }

        if (price < 1) {
            return alert("지출 금액은 1원 이상이어야 합니다.");
        }

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/expenses/budget/${budgetId}/places/${placeId}`,
                {
                    category: selectedCategory,
                    item: item,
                    price: price,
                },
                {
                    headers: {
                        Authorization: getCookie('accessToken'),
                    },
                }
            )
            .then((res) => {
                setExpenses([...expenses, res.data]); //비용에 추가
            })
            .then((res) => {
                setAddExpenseModal(false);
                handleRefresh();
            })
            .catch((err) => console.log("error"));
    };

    return (
        <Container>
            <InputContainer>
                <Title>일정 추가</Title>
                <PlaceInputBox
                    searchBox={searchBox}
                    setSearchBox={setSearchBox}
                    singlePlanData={singlePlanData}
                    handleGeoCode={handleGeoCode}
                    handleRefresh={handleRefresh}
                />
            </InputContainer>
            <PlanWrapper>
                <SideDateBar
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    singlePlanData={singlePlanData}
                />
                <PlanContainer>
                    <Title>일정</Title>
                    {singlePlanData !== null
                        ? singlePlanData.map((singleData) => (
                            <SectionComponent key={singleData.planDateId}>
                                <SectionHeader>
                                    <p>{moment(singleData.planDate).format("M월 D일(ddd)")}</p>
                                </SectionHeader>
                                <SinglePlanBox
                                    planDate={singleData.planDate}
                                    singleData={singleData}
                                    setAddExpenseModal={setAddExpenseModal}
                                    setCurrentDate={setCurrentDate}
                                    setCurrentPlace={setCurrentPlace}
                                    setCurrentPlaceId={setCurrentPlaceId}
                                    handleGeoCode={handleGeoCode}
                                    handleZoom={handleZoom}
                                    expenses={expenses}
                                    handleRefresh={handleRefresh}
                                />
                            </SectionComponent>
                        ))
                        : null}
                    <AddExpense
                        currentPlace={currentPlace}
                        currentPlaceId={currentPlaceId}
                        planDate={currentDate}
                        addExpenseModal={addExpenseModal}
                        setAddExpenseModal={setAddExpenseModal}
                        handleAddExpense={handleAddExpense}
                        handleRefresh={handleRefresh}
                    />
                </PlanContainer>
            </PlanWrapper>
            <BudgetContainer>
                {mainData.budget && (
                    <Budget
                        budgetId={budgetId}
                        addExpenseModal={addExpenseModal}
                        setAddExpenseModal={setAddExpenseModal}
                        handleAddExpense={handleAddExpense}
                        budget={budget}
                        setBudget={setBudget}
                        expenses={expenses}
                        setExpenses={setExpenses}
                        handleRefresh={handleRefresh}
                    />
                )}
            </BudgetContainer>
        </Container>
    )
};

export default PlanSection;

const Container = styled.div`
  width: 50vw;
  height: calc(100vh - 300px);
  overflow-y: scroll;
`;

const PlanWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-top: 150px;
  position: relative;
`;

const InputContainer = styled.div`
  width: 50vw;
  height: 150px;
  padding: 20px 20px;
  border-bottom: 1px solid lightgray;
  position: fixed;
  background-color: lightgray;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PlanContainer = styled.div`
  width: calc(50vw - 50px);
  margin: 40px 30px;
`;


const BudgetContainer = styled.div`
  width: 100%;
  padding: 40px 30px;
  height: auto;
`;

const Title = styled.h2`
  //margin-bottom: 30px;
  align-items: center;
  display: flex;
  font-size: 36px;
  line-height: 1 !important;
  font-weight: 700 !important;
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