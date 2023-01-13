import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getCookie } from "./Cookies";

import EditBudget from "./EditBudget";
import AddExpense from "./AddExpense";
import DeleteExpense from "./DeleteExpense";

const Budget = () => {
  // 더미
  const dummybudget = {
    budgetId: 1,
    expectedBudget: 20000,
    totalExpenses: 15000,
    expenses: [
      {
        expenseId: 1,
        item: "flight",
        price: 10000,
        createdAt: "2023-01-10",
      },
      {
        expenseId: 2,
        item: "ticket",
        price: 5000,
        createdAt: "2023-01-15",
      },
    ],
  };

  //예산, 비용, 유저 정보
  const [budget, setBudget] = useState(dummybudget);
  const [expenses, setExpences] = useState(dummybudget.expenses);
  const [userInfo, setUserInfo] = useState({
    image: "https://picsum.photos/40",
    memberId: 1,
    email: "newyear@gmail.com",
    displayName: "뉴이어",
    memberStatus: "활동중",
  });

  const token = getCookie("accessToken");
  const memberId = getCookie("memberId");

  // 예산 수정 모달
  const [editBudget, setEditBudget] = useState(false);

  // 비용 추가 모달
  const [addExpenseModal, setAddExpenseModal] = useState(false);

  //비용 삭제 모달
  const [deleteExpenseModal, setDeleteExpenseModal] = useState(false);

  // 유저 정보 조회
  //  useEffect(() => {
  // axios
  //   .get(`${process.env.REACT_APP_API_URL}/members/${memberId}`, {
  //     headers: {
  //       Authorization: token,
  //       withCredentials: true,
  //     },
  //   })
  //   .then((res) => {
  //   setUserInfo(res.data)
  //   })
  //   .catch((err) => console.log("error"));
  //  }, []);

  // 예산 정보 조회
  //  useEffect(() => {
  // axios
  //   .get(`${process.env.REACT_APP_API_URL}/budget/${budgetId}`, {
  //     headers: {
  //       Authorization: token,
  //       withCredentials: true,
  //     },
  //   })
  //   .then((res) => {
  //   setExpences(res.data.expences);
  //   setBudget(res.data)
  //   })
  //   .catch((err) => console.log("error"));
  //  }, []);

  // 예산 수정 요청
  const handleEditBudget = (inputBudget) => {
    if (inputBudget < 1) {
      return alert("예산은 1원 이상이어야 합니다.");
    }
    console.log("예산 수정!");
    // axios
    //   .patch(`${process.env.REACT_APP_API_URL}/budget/${budgetId}`, {
    //     headers: {
    //       Authorization: token,
    //       withCredentials: true,
    //     },
    //    data : {
    //    expectedBudget  : inputBudget
    //    }
    //   })
    //   .then((res) => {
    //    setBudget(res.data.expectedBudget);
    //   })
    //  .then((res) => {
    //    setEditBudget(false)
    //  })
    //   .catch((err) => console.log("error"));
    setEditBudget(false);
  };

  // 비용 추가 요청
  const handleAddExpense = (price, selectedCategory, item) => {
    console.log(price, selectedCategory, item);

    if (price < 1) {
      return alert("지출 금액은 1원 이상이어야 합니다.");
    }

    // axios
    //   .post(`${process.env.REACT_APP_API_URL}/expenses/budget/${budgetId}`, {
    //     headers: {
    //       Authorization: token,
    //       withCredentials: true,
    //     },
    //    data : {
    //    category  : selectedCategory,
    //    item  : item,
    //    price  : price,
    //    }
    //   })
    //   .then((res) => {
    //    setExpences([...expences,res.data]); //비용에 추가
    //   })
    //  .then((res) => {
    //    리로드??
    // setAddExpenseModal(false)
    //  })
    //   .catch((err) => console.log("error"));
    setAddExpenseModal(false);
  };

  // 비용 삭제 요청
  const handleDeleteExpense = (expenseId) => {
    console.log("비용 삭제!");
    // console.log(expenseId);
    // axios
    //   .delete(`${process.env.REACT_APP_API_URL}/expenses/${expenseId}`, {
    //     headers: {
    //       Authorization: token,
    //       withCredentials: true,
    //     }
    //   })
    //   .then(() => {
    //    비용 목록 다시 요청?? 리로드?
    //    setDeleteExpenseModal(false)
    //   })
    //   .catch((err) => console.log("error"));
    setDeleteExpenseModal(false);
  };

  return (
    <BudgetContainer>
      <div>Budgeting</div>
      <TopArea>
        <div>My current budget</div>
        <EditBudget
          editBudget={editBudget}
          setEditBudget={setEditBudget}
          originBudget={budget.expectedBudget}
          handleEditBudget={handleEditBudget}
        />
      </TopArea>
      <div className="budget">
        $ {budget.expectedBudget.toLocaleString("ko-KR")}
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
              <img alt="profile_image" src={userInfo.image} />
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
