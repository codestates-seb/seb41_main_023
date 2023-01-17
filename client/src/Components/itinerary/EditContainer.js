// import styled from "styled-components";
// import SinglePlanBox from "./SinglePlanBox";
// import PlaceInputBox from "./PlaceInputBox";
// import {useState} from "react";
// import Budget from "../budget/Buget";
// import moment from "moment/moment";
// import 'moment/locale/ko';
// import AddExpense from "../budget/AddExpense";
// import axios from "axios";
// import {getCookie} from "../../Util/Cookies";
// import SideDateBar from "./SideDateBar";
//
// const Container = styled.div`
//   width: 50vw;
//   height: calc(100vh - 300px);
//   overflow-y: scroll;
// `;
//
// const PlanContainer = styled.div`
//   margin-left: 50px;
//   width: auto;
//   height: auto;
// `;
//
// const BudgetContainer = styled.div`
//   width: auto;
//   margin: 40px 30px;
// `;
//
// const Title = styled.h2`
//   margin-top: 24px;
//   margin-bottom: 24px;
//   align-items: center;
//   display: flex;
//   font-size: 36px;
//   line-height: 1 !important;
//   font-weight: 700 !important;
//   margin-right: auto !important;
// `;
//
// const SectionComponent = styled.div`
//   box-sizing: border-box;
//   border-bottom: 1px solid lightgray;
// `;
//
// const SectionHeader = styled.div`
//   margin-top: 20px;
//   margin-bottom: 20px;
//   margin-left: -48px;
//   padding-left: 48px;
//   position: relative;
//   align-items: center;
//   display: flex;
//   width: 100%;
// `;
//
// const EditContainer = (props) => {
//     const {
//         searchBox,
//         setSearchBox,
//         mainData,
//         handleGeoCode,
//         handleZoom,
//         startDate,
//         setStartDate,
//         endDate,
//         setEndDate,
//         refresh,
//         handleRefresh
//     } = props;
//
//     // const [addExpenseModal, setAddExpenseModal] = useState(false);
//     // const [currentDate, setCurrentDate] = useState(null);
//     // const [currentPlace, setCurrentPlace] = useState(null);
//     // const [currentPlaceId, setCurrentPlaceId] = useState(null);
//     //
//     // const singlePlanData = mainData.planDatesAndPlace;
//     //
//     // const budgetId = mainData.budgetId;
//     //
//     // const [budget, setBudget] = useState({});
//     // const [expenses, setExpenses] = useState([]);
//     //
//     // // 비용 추가 요청
//     // const handleAddExpense = (price, selectedCategory, item, placeId) => {
//     //     console.log(price, selectedCategory, item, placeId)
//     //     if (budget.expectedBudget < 1) {
//     //         return alert("예산을 설정해주세요.");
//     //     }
//     //     if (
//     //         budget.expectedBudget <
//     //         parseInt(budget.totalExpenses) + parseInt(price)
//     //     ) {
//     //         return alert("예산을 초과하였습니다.");
//     //     }
//     //
//     //     if (price < 1) {
//     //         return alert("지출 금액은 1원 이상이어야 합니다.");
//     //     }
//     //
//     //     axios
//     //         .post(
//     //             `${process.env.REACT_APP_API_URL}/expenses/budget/${budgetId}/places/${placeId}`,
//     //             {
//     //                 category: selectedCategory,
//     //                 item: item,
//     //                 price: price,
//     //             },
//     //             {
//     //                 headers: {
//     //                     Authorization: getCookie('accessToken'),
//     //                 },
//     //             }
//     //         )
//     //         .then((res) => {
//     //             setExpenses([...expenses, res.data]); //비용에 추가
//     //         })
//     //         .then((res) => {
//     //             setAddExpenseModal(false);
//     //             handleRefresh();
//     //         })
//     //         .catch((err) => console.log("error"));
//     // };
//
//     // return (
//     //     <Container>
//     //         <SideDateBar
//     //             startDate={startDate}
//     //             setStartDate={setStartDate}
//     //             endDate={endDate}
//     //             setEndDate={setEndDate}
//     //             singlePlanData={singlePlanData}
//     //         />
//     //         <PlanContainer>
//     //             <Title>Add a place you want</Title>
//     //             <PlaceInputBox
//     //                 searchBox={searchBox}
//     //                 setSearchBox={setSearchBox}
//     //                 singlePlanData={singlePlanData}
//     //                 handleGeoCode={handleGeoCode}
//     //                 refresh={refresh}
//     //                 handleRefresh={handleRefresh}
//     //             />
//     //             <Title>일정</Title>
//     //             {singlePlanData !== null
//     //                 ? singlePlanData.map((singleData) => (
//     //                     <SectionComponent key={singleData.planDateId}>
//     //                         <SectionHeader>
//     //                             <p>{moment(singleData.planDate).format("M월 D일(ddd)")}</p>
//     //                         </SectionHeader>
//     //                         <SinglePlanBox
//     //                             planDate={singleData.planDate}
//     //                             singleData={singleData}
//     //                             setAddExpenseModal={setAddExpenseModal}
//     //                             setCurrentDate={setCurrentDate}
//     //                             setCurrentPlace={setCurrentPlace}
//     //                             setCurrentPlaceId={setCurrentPlaceId}
//     //                             handleGeoCode={handleGeoCode}
//     //                             handleZoom={handleZoom}
//     //                             expenses={expenses}
//     //                             refresh={refresh}
//     //                             handleRefresh={handleRefresh}
//     //                         />
//     //                     </SectionComponent>
//     //                 ))
//     //                 : null}
//     //             <AddExpense
//     //                 currentPlace={currentPlace}
//     //                 currentPlaceId={currentPlaceId}
//     //                 planDate={currentDate}
//     //                 addExpenseModal={addExpenseModal}
//     //                 setAddExpenseModal={setAddExpenseModal}
//     //                 handleAddExpense={handleAddExpense}
//     //                 refresh={refresh}
//     //                 handleRefresh={handleRefresh}
//     //             />
//     //         </PlanContainer>
//     //         <BudgetContainer>
//     //             {mainData.budgetId && (
//     //                 <Budget
//     //                     budgetId={mainData.budgetId}
//     //                     addExpenseModal={addExpenseModal}
//     //                     setAddExpenseModal={setAddExpenseModal}
//     //                     handleAddExpense={handleAddExpense}
//     //                     budget={budget}
//     //                     setBudget={setBudget}
//     //                     expenses={expenses}
//     //                     setExpenses={setExpenses}
//     //                     refresh={refresh}
//     //                     handleRefresh={handleRefresh}
//     //                 />
//     //             )}
//     //         </BudgetContainer>
//     //     </Container>
//     // );
// };
//
// export default EditContainer;
