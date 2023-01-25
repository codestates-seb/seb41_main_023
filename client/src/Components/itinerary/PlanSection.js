import SideDateBar from './SideDateBar';
import PlaceInputBox from './PlaceInputBox';
import moment from 'moment';
import SinglePlanBox from './SinglePlanBox';
import AddExpense from '../budget/AddExpense';
import Budget from '../budget/Buget';
import axios from 'axios';
import {getCookie} from '../../Util/Cookies';
import {Fragment, useRef, useState} from 'react';
import styled from 'styled-components';
import {topScrollBtn} from "../../images/topScroll";

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
    const planDateRef = useRef([]);
    const itineraryRef = useRef();
    const budgetingRef = useRef();
    const onDateClick = (planDateId) => {
        planDateRef.current[planDateId].scrollIntoView({behavior: "smooth"});
    };

    const onTabClick = (ref) => {
        ref.current.scrollIntoView({behavior: "smooth"});
    };

    const TopMove = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

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
                <div className={'section__nav'}>
                    <div className='itinerary__nav' onClick={() => onTabClick(itineraryRef)}>Itinerary</div>
                    <div className='budget__nav' onClick={() => onTabClick(budgetingRef)}>Budgeting</div>
                </div>
                <h3 className='section__title' ref={itineraryRef}>Itinerary</h3>
                <div className='itinerary__content'>
                    <div className='itinerary__side-bar'>
                        <SideDateBar
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            singlePlanData={singlePlanData}
                            onDateClick={onDateClick}
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
                                        <h3
                                            className='plan__heading'
                                            ref={(element) => planDateRef.current[singleData.planDateId] = element}
                                        >{moment(singleData.planDate).format('M월 D일, ddd요일')}</h3>
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
            <div className='budget__container' ref={budgetingRef}>
                {budgetId && (
                    <Fragment>
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
                        <button className="topBtn" onClick={TopMove}>
                            {topScrollBtn}
                        </button>
                    </Fragment>
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

  .budget__container {
    .topBtn {
      position: fixed;
      bottom: 50px;
      left: calc(45vw);
      background-color: var(--primary-blue-light-1);
      font-size: 24px;
      padding: 6px;
      border-radius: 50%;
    }
  }
`;

const ItineraryContainer = styled.div`
  margin-bottom: var(--spacing-5);

  .section__nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: var(--spacing-4);

    div {
      display: flex;
      justify-content: center;
      padding: 10px 20px;
      font-size: var(--small-heading-font-size);
      border: 1px solid var(--light-gray-5);
      color: var(--light);
      width: calc(100% / 2);
      transition: 0.5s;
      border-radius: 10px 10px 0 0;
      cursor: pointer;

      .focused {
        //선택된 Tabmenu 에만 적용되는 CSS를 구현
        background-color: rgb(255, 255, 255);
        color: rgb(21, 20, 20);
      }
    }
  }

  .itinerary__content {
    display: flex;
    gap: 50px;
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
