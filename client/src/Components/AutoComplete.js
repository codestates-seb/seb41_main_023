import { useState, useEffect } from "react";
import styled from "styled-components";

const AutoCompleteContainer = styled.div`
  > div > input {
    width: 300px;
    padding: 10px;
  }
`;

const deselectedOptions = [
  "서울",
  "부산",
  "제주",
  "강릉",
  "속초",
  "양양",
  "전주",
  "수원",
  "제천",
];

const DropDownContainer = styled.div`
  > li {
    cursor: pointer;
  }
`;

const Autocomplete = ({ handleDestination }) => {
  const [hasText, setHasText] = useState(false);
  // input에 입력값이 존재하는지 확인하는 용도
  const [inputValue, setInputValue] = useState("");
  // 입력 받은 input값을 저장하는 용도
  const [options, setOptions] = useState(deselectedOptions);
  // 자동완성으로 보여줄 값들을 저장하는 용도

  useEffect(() => {
    if (inputValue === "") {
      setHasText(false);
      setOptions([]);
    } else {
      setOptions(
        deselectedOptions.filter((option) => {
          return option.includes(inputValue);
        })
      );
      handleDestination(inputValue);
    }
  }, [inputValue]);
  // input을 입력할 때마다, input을 포함(includes)한 요소들만 모아 options 배열 업데이트

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setHasText(true);
  };
  // input의 onChange 이벤트 때, 입력값을 inputValue에 저장하고 hasText값 갱신

  const handleDropDownClick = (clickedOption) => {
    setInputValue(clickedOption);
    setHasText(false);
  };
  // 보여지는 자동완성 값 중 하나를 클릭하면 해당 값이 input에 할당

  return (
    <AutoCompleteContainer>
      <div>
        <input
          type="search"
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Search Destination ex. 서울, 부산..."
        ></input>
      </div>
      {hasText && (
        <DropDown options={options} handleComboBox={handleDropDownClick} />
      )}
    </AutoCompleteContainer>
  );
};

/* 자동완성 배열(options)에 들어간 값들이 드롭다운으로 보여지는 부분 */
export const DropDown = ({ options, handleComboBox }) => {
  return (
    <DropDownContainer>
      {options.map((option, index) => {
        return (
          <li key={index} onClick={() => handleComboBox(option)}>
            {option}
          </li>
        );
      })}
    </DropDownContainer>
  );
};

export default Autocomplete;
