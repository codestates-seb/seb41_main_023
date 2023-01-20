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

const SideDateBar = (props) => {
  const { singlePlanData } = props;

  return (
    <LeftSideBar>
      <h5>Dates</h5>
      {singlePlanData.map((date) => (
        <DateBox key={date.planDateId}>
          <button>
            <span>{moment(date.planDate).format('M.D')}</span>
            <span>{moment(date.planDate).format('ddd')}</span>
          </button>
        </DateBox>
      ))}
    </LeftSideBar>
  );
};

export default SideDateBar;
