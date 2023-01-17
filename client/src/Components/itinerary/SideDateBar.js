import styled from "styled-components";
import moment from "moment";
import 'moment/locale/ko';

const LeftSideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 50px;
  background-color: white;
  border-right: 1px solid #e9ecef;
  height: auto;
  overflow: scroll;
  position: absolute;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const DateBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: none;

  button {
    width: 100%;
    height: 50px;
    border-top-style: none;
    border-left-style: none;
    border-right-style: none;
    border-bottom: 1px solid #e9ecef;
    background-color: white;
    cursor: pointer;
  }
`;

const SideDateBar = (props) => {
    const {singlePlanData} = props;

    return (
        <LeftSideBar>
            {singlePlanData.map((date) => (
                <DateBox key={date.planDateId}>
                    <button>{moment(date.planDate).format('M/D(ddd)')}</button>
                </DateBox>
            ))}
        </LeftSideBar>
    )
};

export default SideDateBar;