import styled from "styled-components";

const Category = ({ setCategory, handleCategory }) => {
  //카테고리 목록
  const categoryList = [
    "Flight",
    "Lodging",
    "Car Rental",
    "Public transit",
    "Food",
    "Drink",
    "Sightseeing",
    "Activities",
    "Shopping",
    "Gas",
    "Groceries",
    "Other",
  ];

  return (
    <ModalContainer onClick={() => setCategory(false)}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <div className="title_frame">
          <div className="title">Select Category</div>
          <div className="cancle_button" onClick={() => setCategory(false)}>
            ❌
          </div>
        </div>
        <div className="category_list">
          {categoryList.map((el, idx) => (
            <div
              key={idx}
              className="category_item"
              onClick={() => handleCategory(el)}
            >
              {el}
            </div>
          ))}
        </div>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default Category;

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
  /* width: 430px;
  height: 200px; */
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
    > .cancle_button {
      width: 13px;
      height: 13px;
      color: #6a737c;
      cursor: pointer;
      margin-top: 4px;
    }
  }
  > .category_list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    > .category_item {
      margin: 5px;
      padding: 15px;
      border: 1px solid #6a737c;
      border-radius: 7px;
      background-color: snow;

      width: 90px;
      height: 20px;

      text-align: center;
      line-height: 20px;
      white-space: nowrap;

      cursor: pointer;
    }
  }
`;
