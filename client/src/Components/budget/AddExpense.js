import styled from "styled-components";
import {useState} from "react";

import Category from "./Category";
import moment from "moment";
import 'moment/locale/ko';

const AddExpense = (props) => {
    const {currentPlaceId, planDate, currentPlace, addExpenseModal, setAddExpenseModal, handleAddExpense} = props;
    const [inputs, setInputs] = useState({price: "", item: ""});

    // 카테고리 모달창 활성화
    const [category, setCategory] = useState(false);
    const [dateCategory, setDateCategory] = useState(false);
    const [placeCategory, setPlaceCategory] = useState(false);

    //카테고리 선택
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    //카테고리 변경
    const handleCategory = (el) => {
        setSelectedCategory(el);
        setCategory(false);
    };

    const handleDate = (el) => {
        setSelectedDate(el);
        setDateCategory(false);
    };
    const handlePlace = (el) => {
        setSelectedPlace(el);
        setPlaceCategory(false);
    };

    // 지출 금액, 지출 항목 변경
    const handleInputs = (e) => {
        // 지출 금액에 숫자 외의 입력 값은 ""로 대체
        if (e.target.name === "price") {
            const value = e.target.value;
            const onlyNumber = value.replace(/[^0-9]/g, "");
            return setInputs({...inputs, [e.target.name]: onlyNumber});
        } else {
            setInputs({...inputs, [e.target.name]: e.target.value});
        }
    };

    //입력창 초기화
    const handleClear = () => {
        setInputs({price: "", item: ""});
        setSelectedCategory(null);
        setSelectedDate(null);
        setSelectedPlace(null);
        setAddExpenseModal(false);
    };

    return (
        <>
            {addExpenseModal ? (
                <ModalContainer onClick={handleClear}>
                    <ModalWrapper onClick={(e) => e.stopPropagation()}>
                        <div className="title_frame">
                            <div className="title">비용 추가하기</div>
                            <div className="cancel_button" onClick={handleClear}>
                                ❌
                            </div>
                        </div>
                        <input
                            type="text"
                            name="price"
                            value={inputs.price}
                            className="content"
                            placeholder="지출 금액을 입력해주세요."
                            onChange={handleInputs}
                        />
                        <div
                            className="content category"
                            onClick={() => setCategory(!category)}
                        >
                            {selectedCategory || "항목을 선택하세요"}
                        </div>
                        <div
                            className="content date"
                            onClick={() => setDateCategory(!dateCategory)}
                        >
                            {moment(planDate).format('M월 D일 (ddd)') || "날짜를 선택하세요"}
                        </div>
                        <div
                            className="content places"
                            onClick={() => setPlaceCategory(!placeCategory)}
                        >
                            {currentPlace || "장소를 선택하세요"}
                        </div>
                        <input
                            className="content"
                            name="item"
                            placeholder="비용 상세 내용을 입력해주세요."
                            onChange={handleInputs}
                        />
                        <div className="submit_frame">
                            <button
                                className="btn"
                                onClick={() => {
                                    handleAddExpense(inputs.price, selectedCategory, inputs.item, currentPlaceId);
                                    handleClear();
                                }}
                            >
                                비용 추가
                            </button>
                            <div className="cancel_text" onClick={handleClear}>
                                취소
                            </div>
                        </div>
                    </ModalWrapper>
                </ModalContainer>
            ) : null}

            {category ? (
                <Category setCategory={setCategory} handleCategory={handleCategory}/>
            ) : null}
            {/*{dateCategory ? (*/}
            {/*    <DateSelectBox*/}
            {/*        data={singleData}*/}
            {/*        setDateCategory={setDateCategory}*/}
            {/*        handleDate={handleDate}*/}
            {/*    />*/}
            {/*) : null}*/}
            {/*{placeCategory ? (*/}
            {/*    <PlaceSelectBox*/}
            {/*        data={singlePlanData}*/}
            {/*        planDateId={planDateId}*/}
            {/*        setPlaceCategory={setPlaceCategory}*/}
            {/*        handlePlace={handlePlace}*/}
            {/*    />*/}
            {/*) : null}*/}
        </>
    );
};

export default AddExpense;

const ModalContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
`;

const ModalWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  z-index: 1050;
  width: 300px;
  display: flex;
  flex-direction: column;

  padding: 20px;
  font-size: 13px;
  line-height: 17px;
  background-color: #fff;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.09) 0 1px 4px 0, rgba(0, 0, 0, 0.09) 0 3px 8px 0,
  rgba(0, 0, 0, 0.13) 0 4px 13px 0;

  > .title_frame {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    height: 31px;
    width: 245px;

    margin-bottom: 20px;
    font-size: 13px;

    > .title {
      color: #c22e32;
      font-size: 22px;
      line-height: 32px;
      font-weight: 400;
    }

    > .cancel_button {
      width: 13px;
      height: 13px;
      margin-top: 4px;

      cursor: pointer;
      color: #6a737c;
    }
  }

  > .content {
    width: 230px;
    height: 35px;

    margin-bottom: 12px;
    padding: 7px 10px;

    border-radius: 5px;
    border: 1px solid #3b4045;

    font-size: 14px;
    line-height: 17px;
    color: #3b4045;
  }

  > .category {
    cursor: pointer;
  }

  > .submit_frame {
    display: flex;
    flex-direction: row;

    margin-top: 10px;

    > .btn {
      background-color: #d0393e;
      color: white;
      line-height: 10px;
      box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0 0 inset;
      padding: 0 10px;

      &:hover {
        background-color: #c22e32;
        cursor: pointer;
      }

      border: none;
      border-radius: 5px;
    }

    > .cancel_text {
      width: 70px;
      height: 40px;
      padding: 15px 10px;
      margin: 0 10px;

      font-size: 13px;
      line-height: 15px;
      text-align: center;
      color: #6a737c;

      background-color: white;
      cursor: pointer;

      &:hover {
        border-radius: 5px;

        color: #525960;
        background-color: #f8f9f9;
      }
    }
  }
`;
