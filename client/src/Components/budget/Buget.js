import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {getCookie} from "../../Util/Cookies";

import EditBudget from "./EditBudget";
import AddExpense from "./AddExpense";
import EditExpense from "./EditExpense";
import DeleteExpense from "./DeleteExpense";

const Budget = ({budgetId, handleAddExpense, budget, setBudget, expenses, setExpenses, refresh, handleRefresh}) => {
    const token = getCookie("accessToken");
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
                setExpenses(res?.data?.expenses || []);
                handleRefresh();
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
                setBudget({...budget, expectedBudget: res.data.expectedBudget});
            })
            .then((res) => {
                setEditBudget(false);
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

    const budgetUsage = () => {
        if (!budget.totalExpenses) {
            return 0;
        } else {
            return Math.floor((budget?.totalExpenses / budget?.expectedBudget) * 100);
        }
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
                ₩ {budget?.expectedBudget?.toLocaleString("ko-KR")}
            </div>
            <hr/>
            <MiddleArea>
                <div>지출 일정</div>
                <AddExpense
                    addExpenseModal={addExpenseModal}
                    setAddExpenseModal={setAddExpenseModal}
                    handleAddExpense={handleAddExpense}
                />
                <div>지출 장소</div>
                <div>메모</div>
                <div>지출 비용</div>
                <AddExpenseBtn
                    onClick={() => {
                        setAddExpenseModal(!addExpenseModal);
                    }}
                >
                    Add Expense
                </AddExpenseBtn>
            </MiddleArea>
            {expenses.map((el) => {
                return (
                    <BottomArea key={el.expenseId}>
                        {/*<div className="bottom_left">*/}
                        {/*<div className="meta_user">*/}
                        {/*    <div className="meta_user_bottom">*/}
                        <div>{moment(el.createdAt).format("M월 DD일")}</div>
                        <div>{el.placeName}</div>
                        <div>•{el.item}</div>
                        <div className="meta_user_expense">
                            ₩ {el.price.toLocaleString("ko-KR")}
                        </div>
                        <div className={'delete_expense'}>
                            <div
                                onClick={() => {
                                    setCurrentExpenseId(el.expenseId);
                                    setEditExpenseModal(!editExpenseModal);
                                }}
                            >
                                ✏️
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
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*</div>*/}
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
                {budgetUsage()} %
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
  width: 100%;
  justify-content: space-between;
  align-items: center;

  margin: 15px 0;

  .bottom_left {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    .meta_user {
      width: 300px;
    }


    > img {
      border-radius: 50%;
      margin-right: 15px;
    }

    .meta_user_bottom {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }
  }


  > * {
    margin-right: 5px;
  }

  .delete_expense {
    opacity: 1;

    div {
      margin-bottom: 5px;
    }

    :hover {
      opacity: 1;
      cursor: pointer;
    }
  }
`;

const AddExpenseBtn = styled.div`
  cursor: pointer;
`;
