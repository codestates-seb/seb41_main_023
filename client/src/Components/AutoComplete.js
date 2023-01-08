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
    list-style: none;

    border: 1px solid #999;
    border-top-width: 0;

    &.active {
      background-color: grey;
      color: #fff;
      font-weight: 700;
    }
  }
`;

const Autocomplete = ({ handleDestination, inputRef }) => {
  const reESC = /[\\^$.*+?()[\]{}|]/g;
  const reChar = /[가-힣]/;
  const reJa = /[ㄱ-ㅎ]/;
  const offset = 44032;

  const orderOffest = [
    ["ㄱ", 44032],
    ["ㄲ", 44620],
    ["ㄴ", 45208],
    ["ㄷ", 45796],
    ["ㄸ", 46384],
    ["ㄹ", 46972],
    ["ㅁ", 47560],
    ["ㅂ", 48148],
    ["ㅃ", 48736],
    ["ㅅ", 49324],
  ];

  const con2syl = Object.fromEntries(orderOffest);
  const pattern = (ch) => {
    let r;
    if (reJa.test(ch)) {
      const begin =
        con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl["ㅅ"];
      const end = begin + 587;
      r = `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    } else if (reChar.test(ch)) {
      const chCode = ch.charCodeAt(0) - offset;
      if (chCode % 28 > 0) return ch;
      const begin = Math.floor(chCode / 28) * 28 + offset;
      const end = begin + 27;
      r = `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    } else r = ch.replace(reESC, "\\$&");
    return `(${r})`;
  };

  /**
   *
   * @param {string} inputValue 입력값
   * @param {string} target 리스트 중 1
   */

  const isInitialMatch = (inputValue, target) => {
    const reg = new RegExp(inputValue.split("").map(pattern).join(".*?"), "i");
    const matches = reg.exec(target);
    return Boolean(matches);
  };

  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  const [activeSuggestion, setActiveSuggestion] = useState(0);

  /**
   * @param {array} deselectedOptions 리스트
   * @param {string} inputValue 입력 값
   * @returns 자동완성으로 보여줄 값
   */

  const matchStock = (deselectedOptions, inputValue) => {
    if (!inputValue) {
      return [];
    }

    if (!isNaN(Number(inputValue)) && inputValue.length < 3) {
      return [];
    }

    return deselectedOptions
      .filter((option) => {
        return isInitialMatch(inputValue, option);
      })
      .map((option) => {
        return option;
      });
  };

  useEffect(() => {
    if (inputValue === "") {
      setHasText(false);
      setOptions([]);
    } else {
      setOptions(matchStock(deselectedOptions, inputValue));
      handleDestination(inputValue);
    }
  }, [inputValue]);
  // input을 입력할 때마다, input을 포함한 요소들만 모아 options 배열 업데이트

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

  const handleKeyDown = (e) => {
    //enter 키를 누르면 input 값이 활성화된 옵션으로 변경
    if (e.keyCode === 13) {
      setInputValue(options[activeSuggestion]);
      setActiveSuggestion(0);
      setHasText(false);
    }

    // arrow 키를 누르면 활성화된 옵션 -1
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }

    // arrow 키를 누르면 활성화된 옵션 +1
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === options.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  return (
    <AutoCompleteContainer>
      <div>
        <input
          type="search"
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Search Destination ex. 서울, 부산..."
          onKeyDown={handleKeyDown}
          ref={inputRef}
        ></input>
      </div>
      {hasText && (
        <DropDown
          options={options}
          handleComboBox={handleDropDownClick}
          activeSuggestion={activeSuggestion}
        />
      )}
    </AutoCompleteContainer>
  );
};

/* 자동완성 배열(options)에 들어간 값들이 드롭다운으로 보여지는 부분 */
export const DropDown = ({ options, handleComboBox, activeSuggestion }) => {
  return (
    <DropDownContainer>
      {options.map((option, index) => {
        let className;

        if (index === activeSuggestion) {
          className = "active";
        }
        return (
          <li
            key={option}
            onClick={() => handleComboBox(option)}
            className={className}
          >
            {option}
          </li>
        );
      })}
    </DropDownContainer>
  );
};

export default Autocomplete;
