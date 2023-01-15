import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getCookie } from "../../Util/Cookies";

import EditBudget from "./EditBudget";
import AddExpense from "./AddExpense";
import EditExpense from "./EditExpense";
import DeleteExpense from "./DeleteExpense";

const Budget = ({ budgetId }) => {
  const token = getCookie("accessToken");
  //예산, 비용, 유저 정보
  const [budget, setBudget] = useState({});
  const [expenses, setExpences] = useState([]);

  const [currentExpenseId, setCurrentExpenseId] = useState();

  /* Modal */

  // 예산 수정
  const [editBudget, setEditBudget] = useState(false);

  // 비용 추가
  const [addExpenseModal, setAddExpenseModal] = useState(false);

  // 비용 수정
  const [editExpenseModal, setEditExpenseModal] = useState(false);

  //비용 삭제
  const [deleteExpenseModal, setDeleteExpenseModal] = useState(false);

  const [refresh, setRefresh] = useState(1);

  //refresh function
  const handleRefresh = () => {
    setRefresh(refresh * -1);
  };

  // 예산과 비용 조회
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/budget/${budgetId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setBudget(res.data);
        setExpences(res?.data?.expenses || []);
      })
      .catch((err) => console.log("error"));
  }, [refresh]);

  // 예산 수정 요청
  const handleEditBudget = (inputBudget) => {
    if (inputBudget < 1) {
      return alert("예산은 1원 이상이어야 합니다.");
    }

    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/budget/${budgetId}`,
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
        setEditBudget(false);
      })
      .catch((err) => console.log("error"));
  };

  // 비용 추가 요청
  const handleAddExpense = (price, selectedCategory, item) => {
    if (budget.expectedBudget < 1) {
      return alert("예산을 설정해주세요.");
    }
    if (
      budget.expectedBudget <
      parseInt(budget.totalExpenses) + parseInt(price)
    ) {
      return alert("예산을 초과하였습니다.");
    }

    if (price < 1) {
      return alert("지출 금액은 1원 이상이어야 합니다.");
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/expenses/budget/${budgetId}`,
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
        setExpences([...expenses, res.data]); //비용에 추가
      })
      .then((res) => {
        setAddExpenseModal(false);
      })
      .catch((err) => console.log("error"));
  };

  // 비용 수정 요청
  const handleEditExpense = (price, selectedCategory, item, expenseId) => {
    console.log(price, selectedCategory, item, expenseId);
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/expenses/${expenseId}`,
        {
          category: selectedCategory,
          item: item,
          price: price,
        },
        {
          headers: {
            Authorization: token,
            withCredentials: true,
          },
        }
      )
      .then((res) => {
        setEditExpenseModal(false);
        handleRefresh();
      })
      .catch((err) => console.log("error"));
  };

  // 비용 삭제 요청
  const handleDeleteExpense = (expenseId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/expenses/${expenseId}`, {
        headers: {
          Authorization: token,
          withCredentials: true,
        },
      })
      .then((res) => {
        handleRefresh();
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
              <div className="meta_user">
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
                <div
                  onClick={() => {
                    setCurrentExpenseId(el.expenseId);
                    setEditExpenseModal(!editExpenseModal);
                  }}
                >
                  🤔
                </div>

                <div
                  onClick={() => {
                    setCurrentExpenseId(el.expenseId);
                    setDeleteExpenseModal(!deleteExpenseModal);
                  }}
                >
                  ❌
                </div>
              </div>
            </div>
          </BottomArea>
        );
      })}

      {deleteExpenseModal ? (
        <DeleteExpense
          expenseId={currentExpenseId}
          handleDeleteExpense={handleDeleteExpense}
          setDeleteExpenseModal={setDeleteExpenseModal}
        />
      ) : null}

      {editExpenseModal ? (
        <EditExpense
          expenseId={currentExpenseId}
          handleEditExpense={handleEditExpense}
          setEditExpenseModal={setEditExpenseModal}
          editExpenseModal={editExpenseModal}
        />
      ) : null}

      <div>예산 사용량</div>
      <div>
        {(budget.expectedBudget / budget.totalExpenses / 100).toFixed()} %{" "}
      </div>
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
      opacity: 1;

      :hover {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
`;
