import styled from 'styled-components';

import { dayOfTheWeekKo } from '../../Util/dayUtil';
import { formatMonthAndDay } from '../../Util/dayUtil';

const LeftSideBar = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);

  > h5 {
    font-size: var(--small-heading-font-size);
    line-height: var(--small-heading-line-height);
    color: var(--primary-blue-bright);
    font-weight: 500;
    cursor: default;
  }
`;

const DateBox = styled.div`
  > button {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: var(--spacing-2);
    width: 100%;
    border-radius: 3px;
    background-color: transparent;

    > span {
      font-size: var(--large-text-size);
      line-height: var(--large-text-line-height);
      color: inherit;
    }

    &:hover {
      color: var(--primary-blue);
    }

    &:active {
      color: var(--primary-blue-dark);
    }
  }
`;

const SideDateBar = props => {
  const { singlePlanData, onDateClick } = props;

  return (
    <LeftSideBar>
      <h5>Dates</h5>
      {singlePlanData.map(date => (
        <DateBox key={date.planDateId}>
          <button onClick={() => onDateClick(date.planDateId)}>
            <span>{formatMonthAndDay(date.planDate)}</span>
            <span>{dayOfTheWeekKo(date.planDate)}</span>
          </button>
        </DateBox>
      ))}
    </LeftSideBar>
  );
};

export default SideDateBar;
