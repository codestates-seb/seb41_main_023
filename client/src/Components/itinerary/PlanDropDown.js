import styled from 'styled-components';
import { Fragment, useState } from 'react';
import SingleDate from './SingleDate';
import moment from 'moment';

export const Container = styled.div`
  position: relative;
  min-width: 77px;
`;

const activeExist = ({ active = true }) => {
  return `max-height: ${active ? '100px' : '0'}`;
};

export const StyledOptionList = styled.ul`
  box-sizing: border-box; // 테두리에 맞게 ul 크기 조절
  position: absolute; // absolute를 이용해 위치를 원하는 곳에 둘것.
  top: 2.6rem; // 그곳에 위에서부터 2.6rem(드롭다운본체의 크기)만큼 떨어진 곳.
  list-style-type: none; // ul을 커스텀할 거라면 꼭 해줘야하는 list-style-type:none
  width: 120%; // 크기는 드롭다운 본체의 너비와 동일하게함.
  border-radius: 8px; // 동글동글하게 아래부분을 만들어야해서 border-radius를 줌.
  background: #ffffff; // 배경색
  ${activeExist};
  transition: 0.2s ease-in-out; // 0.2초를 걸려서 부드럽게 ul이 보이고 사라진다.
  overflow-y: scroll; // scroll을 통해 리스트 내용들을 보겠다.
  &::-webkit-scrollbar {
    // scrollbar 자체의 설정
    // 너비를 작게 설정
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    // scrollbar의 배경부분 설정
    // 부모와 동일하게 함(나중에 절전모드, 밤모드 추가되면 수정하기 번거로우니까... 미리 보이는 노동은 최소화)
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    // scrollbar의 bar 부분 설정
    // 동글동글한 회색 바를 만든다.
    border-radius: 1rem;
    background: transparent;
  }
  &::-webkit-scrollbar-button {
    // scrollbar의 상하단 위/아래 이동 버튼
    // 크기를 안줘서 안보이게 함.
    width: 0;
    height: 0;
  }
`;

export const StyledOptionItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 7px 3px;
  color: #0f0f0f;
  font-size: 12px;

  &:hover {
    background: #ffffff;
  }
`;

const dropDownSvg = (
  <svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 24'>
    <path fill='currentColor' d='m7 10l5 5l5-5z' />
  </svg>
);

const PlanDropDown = (props) => {
  const { singlePlanData, setSelectedDateId } = props;
  const [selected, setSelected] = useState('날짜 선택');
  const [isShow, setIsShow] = useState(false);

  const showMenu = () => {
    setIsShow((prevState) => !prevState);
  };

  return (
    <Container>
      <button className='button--primary' value={selected} onClick={showMenu}>
        {selected}
      </button>
      <StyledOptionList active={isShow}>
        {singlePlanData.map((data) => (
          <SingleDate
            key={data.planDateId}
            id={data.planDateId}
            data={data}
            setIsShow={setIsShow}
            setSelected={setSelected}
            setSelectedDateId={setSelectedDateId}
          />
        ))}
      </StyledOptionList>
    </Container>
  );
};

export default PlanDropDown;
