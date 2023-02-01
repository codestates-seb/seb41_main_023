import styled from 'styled-components';

import SinglePlan from './SinglePlan';

const SinglePlanBox = props => {
  const {
    setAddExpenseModal,
    singleData,
    setCurrentDate,
    setCurrentPlace,
    setCurrentPlaceId,
    planDate,
    handleGeoCode,
    handleZoom,
    expenses,
    refresh,
    handleRefresh,
    handleBudgetRefresh,
    budget,
    handleScroll,
  } = props;

  return (
    <Container>
      {singleData &&
        singleData.places.map((data, idx) => (
          <SinglePlan
            key={data.placeId}
            idx={idx}
            data={data}
            setAddExpenseModal={setAddExpenseModal}
            setCurrentDate={setCurrentDate}
            planDate={planDate}
            setCurrentPlace={setCurrentPlace}
            setCurrentPlaceId={setCurrentPlaceId}
            handleGeoCode={handleGeoCode}
            handleZoom={handleZoom}
            refresh={refresh}
            handleRefresh={handleRefresh}
            handleBudgetRefresh={handleBudgetRefresh}
            budget={budget}
            handleScroll={handleScroll}
          />
        ))}
    </Container>
  );
};

export default SinglePlanBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
`;
