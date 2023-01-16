import styled from "styled-components";
import moment from "moment";
import 'moment/locale/ko';

const DateSelectBox = ({ setDateCategory, handleDate, data }) => {
  //카테고리 목록

    // console.log('날짜', data)
  // const dateList = data.map((date) => moment(date.planDate).format('M월 D일(ddd)'))
  //   console.log('datelist: ', dateList);

  return (
    <ModalContainer onClick={() => setDateCategory(false)}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <div className="title_frame">
          <div className="title">Select Date</div>
          <div className="cancel_button" onClick={() => setDateCategory(false)}>
            ❌
          </div>
        </div>
        <div className="category_list">
          {data.map((el) => (
            <div
              key={el.planDateId}
              className="category_item"
              onClick={() => handleDate(el.planDate)}
            >
              {el.planDate}
            </div>
          ))}
        </div>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default DateSelectBox;

const ModalContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  /* display: none; */
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
  max-width: 500px;
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
    margin-bottom: 20px;
    width: 432px;
    height: 31px;
    font-size: 13px;
    > .title {
      color: #c22e32;
      font-size: 27px;
      line-height: 32px;
      font-weight: 400;
    }
    > .cancel_button {
      width: 13px;
      height: 13px;
      color: #6a737c;
      cursor: pointer;
      margin-top: 4px;
    }
  }
  > .category_list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    > .category_item {
      margin: 5px;
      padding: 10px;
      border: 1px solid #6a737c;
      border-radius: 5px;
      background-color: snow;

      width: 120px;
      height: 40px;

      text-align: center;
      white-space: nowrap;

      cursor: pointer;
    }
  }
`;
