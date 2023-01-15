import styled from "styled-components";
import { useState } from "react";

const EditBudget = (props) => {
  const { editBudget, setEditBudget, handleEditBudget, originBudget } = props;
  const [inputBudget, setInputBudget] = useState(originBudget);
  const handleInputBudget = (e) => {
    setInputBudget(e.target.value);
  };

  return (
    <>
      {editBudget ? (
        <ModalContainer onClick={() => setEditBudget(false)}>
          <ModalWrapper onClick={(e) => e.stopPropagation()}>
            <div className="title_frame">
              <div className="title">Set Budget</div>
              <div
                className="cancle_button"
                onClick={() => setEditBudget(false)}
              >
                ❌
              </div>
            </div>
            <input
              id="budget"
              className="content"
              placeholder={"예산을 입력해주세요"}
              value={inputBudget}
              onChange={handleInputBudget}
            />
            <div className="submit_frame">
              <button
                className="btn"
                onClick={() => handleEditBudget(inputBudget)}
              >
                Set Budget
              </button>
              <div className="cancle_text" onClick={() => setEditBudget(false)}>
                Cancle
              </div>
            </div>
          </ModalWrapper>
        </ModalContainer>
      ) : null}
      <EditBudgetText
        onClick={() => {
          setEditBudget(!editBudget);
        }}
      >
        Edit Budget
      </EditBudgetText>
    </>
  );
};

export default EditBudget;

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
  width: 300px;
  height: 150px;
  z-index: 1050;

  display: flex;
  flex-direction: column;

  padding: 24px;
  font-size: 13px;
  line-height: 17px;
  background-color: #fff;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 1px 4px 0px,
    rgba(0, 0, 0, 0.09) 0px 3px 8px 0px, rgba(0, 0, 0, 0.13) 0px 4px 13px 0px;
  > .title_frame {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    height: 31px;
    width: 300px;

    margin-bottom: 20px;
    font-size: 13px;
    > .title {
      color: #c22e32;
      font-size: 27px;
      line-height: 32px;
      font-weight: 400;
    }
    > .cancle_button {
      width: 13px;
      height: 13px;
      margin-top: 4px;

      cursor: pointer;
      color: #6a737c;
      /* background-color: #3b4045; */
    }
  }
  > .content {
    width: 250px;
    height: 16px;

    margin-bottom: 30px;
    padding: 7px 10px;

    border-radius: 7px;
    border: 1px solid #3b4045;

    font-size: 14px;
    line-height: 17px;
    color: #3b4045;
  }
  > .submit_frame {
    display: flex;
    flex-direction: row;
    > .btn {
      background-color: #d0393e;
      color: white;
      line-height: 10px;
      box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
      padding: 0 10px;

      &:hover {
        background-color: #c22e32;
        cursor: pointer;
      }
      border: none;
      border-radius: 5px;
    }
    > .cancle_text {
      width: 50px;
      height: 10px;
      padding: 15px 10px;
      margin: 0 20px;

      font-size: 13px;
      line-height: 15px;
      text-align: center;
      color: #6a737c;

      background-color: none;
      cursor: pointer;
      &:hover {
        border-radius: 5px;

        color: #525960;
        background-color: #f8f9f9;
      }
    }
  }
`;

const EditBudgetText = styled.div`
  cursor: pointer;
`;
