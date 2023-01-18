import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

const LeftSideBar = styled.div`
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
    padding: var(--spacing-2) 0;
    width: 100%;
    font-size: var(--large-text-size);
    line-height: var(--large-text-line-height);
    border-radius: 3px;
    background-color: transparent;

    &:hover {
      color: var(--primary-blue-dark);
      /* font-weight: 600; */
    }

    &:active {
      background-color: var(--light-gray-2);
    }
  }
`;

const SideDateBar = (props) => {
  const { singlePlanData } = props;

  return (
    <LeftSideBar>
      <h5>Dates</h5>
      {singlePlanData.map((date) => (
        <DateBox key={date.planDateId}>
          <button>{moment(date.planDate).format('M.D')}</button>
        </DateBox>
      ))}
    </LeftSideBar>
  );
};

export default SideDateBar;
