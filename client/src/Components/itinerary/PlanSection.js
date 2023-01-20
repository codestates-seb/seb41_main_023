import SideDateBar from './SideDateBar';
import PlaceInputBox from './PlaceInputBox';
import moment from 'moment';
import SinglePlanBox from './SinglePlanBox';
import AddExpense from '../budget/AddExpense';
import Budget from '../budget/Buget';
import axios from 'axios';
import {getCookie} from '../../Util/Cookies';
import {useState} from 'react';
import styled from 'styled-components';

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
        refresh,
        handleRefresh,
        budgetRefresh,
        handleBudgetRefresh
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
                handleBudgetRefresh();
            })
            .catch((err) => console.log(err));
    };

    return (
        <Container>
            <ItineraryContainer>
                <h3 className='section__title'>Itinerary</h3>
                <div className='itinerary__content'>
                    <div className='itinerary__side-bar'>
                        <SideDateBar
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            singlePlanData={singlePlanData}
                        />
                    </div>
                    <div className='itinerary__main'>
                        <InputContainer>
                            <h3 className='plan__heading'>Add places</h3>
                            <PlaceInputBox
                                searchBox={searchBox}
                                setSearchBox={setSearchBox}
                                singlePlanData={singlePlanData}
                                handleGeoCode={handleGeoCode}
                                handleRefresh={handleRefresh}
                            />
                        </InputContainer>
                        <PlanContainer>
                            {singlePlanData !== null
                                ? singlePlanData.map((singleData) => (
                                    <SectionComponent key={singleData.planDateId}>
                                        <h3 className='plan__heading'>{moment(singleData.planDate).format('M월 D일, ddd요일')}</h3>
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
                                            refresh={refresh}
                                            handleRefresh={handleRefresh}
                                            handleBudgetRefresh={handleBudgetRefresh}
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
                    </div>
                </div>
            </ItineraryContainer>
            <div className='budget__container'>
                {budgetId && (
                    <Budget
                        budgetId={budgetId}
                        addExpenseModal={addExpenseModal}
                        setAddExpenseModal={setAddExpenseModal}
                        handleAddExpense={handleAddExpense}
                        budget={budget}
                        setBudget={setBudget}
                        expenses={expenses}
                        setExpenses={setExpenses}
                        refresh={refresh}
                        handleRefresh={handleRefresh}
                        budgetRefresh={budgetRefresh}
                        handleBudgetRefresh={handleBudgetRefresh}
                    />
                )}
            </div>
        </Container>
    );
};

export default PlanSection;

const Container = styled.div`
  position: absolute;
  width: 50vw;
  top: 350px;
  padding: 50px;

  .section__title {
    margin-bottom: var(--spacing-4);
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    color: var(--black);
    font-weight: 600;
  }

  .plan__heading {
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    color: var(--dark-gray-1);
    font-weight: normal;
  }
`;

const ItineraryContainer = styled.div`
  margin-bottom: var(--spacing-5);

  .itinerary__content {
    display: flex;
    gap: 50px;
    /* gap: var(--spacing-4); */
  }

  .itinerary__side-bar {
    float: left;
    min-width: 60px;
  }

  .itinerary__main {
    float: right;
    width: 100%;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: var(--spacing-3);
  border-bottom: 1px solid var(--light-gray-4);

  > .plan__heading {
    padding-bottom: var(--spacing-3);
  }
`;

const PlanContainer = styled.div``;

const SectionComponent = styled.div`
  padding: var(--spacing-3) 0;
  border-bottom: 1px solid var(--light-gray-4);

  > .plan__heading {
    margin-bottom: var(--spacing-4);
  }

  .single-plan__box {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
  }
`;
