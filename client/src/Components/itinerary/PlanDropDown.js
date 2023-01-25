import styled from "styled-components";
import { useState } from "react";
import SingleDate from "./SingleDate";

export const Container = styled.div`
  position: relative;
  min-width: 77px;

  > button {
    min-width: 77px;
  }
`;

export const StyledOptionList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: var(--spacing-2);
  width: 100%;
  background-color: var(--white);
  max-height: 200px;
  overflow-y: scroll;
  border-radius: 3px;
  box-shadow: 0px 0px 1px rgba(9, 30, 66, 0.31),
    0px 4px 6px rgba(9, 30, 66, 0.15);
  list-style: none;
  transition: all 0.1s ease-in;
  display: ${(props) => (props.active ? "block" : "none")};
  z-index: 1000000;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledOptionItem = styled.li`
  width: 100%;
  padding: 12px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: var(--light-gray-2);
    color: var(--dark-gray-1);
  }

  &:active {
    background: var(--light-gray-3);
  }
`;

const dropDownSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path fill="currentColor" d="m7 10l5 5l5-5z" />
  </svg>
);

const PlanDropDown = (props) => {
  const { singlePlanData, setSelectedDateId } = props;
  const [selected, setSelected] = useState("날짜 선택");
  const [isShow, setIsShow] = useState(false);

  const showMenu = () => {
    setIsShow((prevState) => !prevState);
  };

  return (
    <Container>
      <button className="button--primary" value={selected} onClick={showMenu}>
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
