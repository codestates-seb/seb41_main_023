import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { getCookie } from "../../Util/Cookies";

import EditBudget from "./EditBudget";
import AddExpense from "./AddExpense";
import DeleteExpense from "./DeleteExpense";

const Budget = ({ budgetId }) => {
  //예산, 비용, 유저 정보
  const [budget, setBudget] = useState({});
  const [expenses, setExpences] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const token = getCookie("accessToken");
  const memberId = getCookie("memberId");

  const budgetRef = useRef();

  // 예산 수정 모달
  const [editBudget, setEditBudget] = useState(false);

  // 비용 추가 모달
  const [addExpenseModal, setAddExpenseModal] = useState(false);

  //비용 삭제 모달
  const [deleteExpenseModal, setDeleteExpenseModal] = useState(false);

  // 유저 정보 조회
  const getUserInfo = () => {
    axios
      .get(`https://www.sebmain41team23.shop/members/userProfile/${memberId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setUserInfo(res.data));
  };

  // 예산과 비용 조회
  const getBudget = () => {
    axios
      .get(`https://www.sebmain41team23.shop/budget/${budgetId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setBudget(res.data);
        setExpences(res.data.expenses || []);
      })
      .catch((err) => console.log("error"));
  };

  useEffect(() => {
    getUserInfo();
    getBudget();
  }, []);

  // 예산 수정 요청
  const handleEditBudget = (inputBudget) => {
    if (inputBudget < 1) {
      return alert("예산은 1원 이상이어야 합니다.");
    }

    axios
      .patch(
        `https://www.sebmain41team23.shop/budget/${budgetId}`,
        {
          expectedBudget: inputBudget,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setBudget({ ...budget, expectedBudget: res.data.expectedBudget });
      })
      .then((res) => {
        // budgetRef.current.value = "";
        setEditBudget(false);
      })
      .catch((err) => console.log("error"));
  };

  // 비용 추가 요청
  const handleAddExpense = (price, selectedCategory, item) => {
    // console.log(price, selectedCategory, item);

    if (price < 1) {
      return alert("지출 금액은 1원 이상이어야 합니다.");
    }

    axios
      .post(
        `https://www.sebmain41team23.shop/expenses/budget/${budgetId}`,
        {
          category: selectedCategory,
          item: item,
          price: price,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setExpences([...expenses, res.data]); //비용에 추가
      })
      .then((res) => {
        setAddExpenseModal(false);
      })
      .catch((err) => console.log("error"));
  };

  // 비용 삭제 요청
  const handleDeleteExpense = (expenseId) => {
    axios
      .delete(`https://www.sebmain41team23.shop/expenses/${expenseId}`, {
        headers: {
          Authorization: token,
          withCredentials: true,
        },
      })
      .then((res) => {
        console.log(res);
        //리로드?
        setDeleteExpenseModal(false);
      })
      .catch((err) => console.log("error"));
  };

  return (
    <BudgetContainer>
      <div>Budgeting</div>
      <TopArea>
        <div>My current budget</div>
        <EditBudget
          editBudget={editBudget}
          setEditBudget={setEditBudget}
          handleEditBudget={handleEditBudget}
          originBudget={budget.expectedBudget}
          budgetRef={budgetRef}
        />
      </TopArea>
      <div className="budget">
        $ {budget?.expectedBudget?.toLocaleString("ko-KR")}
      </div>
      <hr />
      <MiddleArea>
        <div>Expenses</div>
        <AddExpense
          addExpenseModal={addExpenseModal}
          setAddExpenseModal={setAddExpenseModal}
          handleAddExpense={handleAddExpense}
        />
      </MiddleArea>
      {expenses.map((el) => {
        return (
          <BottomArea key={el.expenseId}>
            <div className="bottom_left">
              <img alt="profile_image" src={userInfo.profileImage} />
              <div className="meta_user">
                <div className="meta_user_top">{userInfo.displayName}</div>
                <div className="meta_user_bottom">
                  <div>{moment(el.createdAt).format("MMM DD")}</div>
                  <div>•{el.item}</div>
                </div>
              </div>
            </div>
            <div className="bottom_right">
              <div className="meta_user_expense">
                $ {el.price.toLocaleString("ko-KR")}
              </div>
              <div className="delete_expense">
                <div onClick={() => setDeleteExpenseModal(!deleteExpenseModal)}>
                  ❌
                </div>
                {deleteExpenseModal ? (
                  <DeleteExpense
                    expenseId={el.expenseId}
                    handleDeleteExpense={handleDeleteExpense}
                    setDeleteExpenseModal={setDeleteExpenseModal}
                    deleteExpenseModal={deleteExpenseModal}
                  />
                ) : null}
              </div>
            </div>
          </BottomArea>
        );
      })}
    </BudgetContainer>
  );
};

export default Budget;

const BudgetContainer = styled.div`
  .budget {
    font-size: 30px;
    font-weight: 700;
  }
`;

const TopArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 15px 0;
`;
const MiddleArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 15px 0;
`;
const BottomArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 15px 0;

  .bottom_left {
    display: flex;
    flex-direction: row;

    > img {
      border-radius: 50%;
      margin-right: 15px;
    }

    .meta_user_bottom {
      display: flex;
      flex-direction: row;
    }
  }

  .bottom_right {
    display: flex;
    > * {
      margin-right: 5px;
    }
    .delete_expense {
      opacity: 0;

      :hover {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
`;
