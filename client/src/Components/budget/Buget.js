import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import {getCookie} from '../../Util/Cookies';

import EditBudget from './EditBudget';
import AddExpense from './AddExpense';
import EditExpense from './EditExpense';
import DeleteExpense from './DeleteExpense';

const Budget = ({
                    budgetId,
                    handleAddExpense,
                    budget,
                    setBudget,
                    expenses,
                    setExpenses,
                    handleRefresh,
                    handleBudgetRefresh,
                    budgetRefresh
                }) => {
    const token = getCookie('accessToken');
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
            .catch((err) => console.log('error'));
    }, [budgetRefresh]);

    // 예산 수정 요청
    const handleEditBudget = (inputBudget) => {
        if (inputBudget < 1) {
            return alert('예산은 1원 이상이어야 합니다.');
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
                handleRefresh();
                handleBudgetRefresh();
            })
            .catch((err) => console.log('error'));
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
                handleBudgetRefresh();
            })
            .catch((err) => console.log(err));
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
                setDeleteExpenseModal(false);
                handleBudgetRefresh();
            })
            .catch((err) => console.log(err));
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
            <div className='section__title'>Budgeting</div>
            <CurrentBudget>
                <div className='budget__header'>
                    <h3 className='plan__heading'>My current budget</h3>
                    <EditBudget
                        editBudget={editBudget}
                        setEditBudget={setEditBudget}
                        handleEditBudget={handleEditBudget}
                        originBudget={budget.expectedBudget}
                    />
                </div>
                <h1 className='budget__current-amount'>
                    ₩ {budget?.expectedBudget?.toLocaleString('ko-KR')}
                </h1>
            </CurrentBudget>
            <Expense>
                <div className='expense__header'>
                    <h3 className='plan__heading'>Expense</h3>
                </div>
                <AddExpense
                    addExpenseModal={addExpenseModal}
                    setAddExpenseModal={setAddExpenseModal}
                    handleAddExpense={handleAddExpense}
                />
            </Expense>
            <div className='my-expense__container'>
                {expenses.map((el) => {
                    return (
                        <MyExpenses key={el.expenseId}>
                            <div className='expense__item'>
                                <div className='expense__item-top'>
                                    <div>{el.placeName}</div>
                                    <div className='meta_user_expense'>₩ {el.price.toLocaleString('ko-KR')}</div>
                                </div>
                                <div className='expense__item-date'>
                                    {moment(el.createdAt).format('M월 DD일')} • {el.category}
                                </div>
                                <div className='expense__message'>{el.item}</div>
                            </div>
                            <div className='expense__controls'>
                                <div
                                    onClick={() => {
                                        setCurrentExpenseId(el.expenseId);
                                        setEditExpenseModal(!editExpenseModal);
                                    }}
                                >
                                    <svg viewBox='0 0 16 16' className='svg-icon--20 icon__edit'>
                                        <path
                                            fillRule='evenodd'
                                            fill='currentColor'
                                            d='M2.35675466,10.6432453 L8.64324534,4.35675466 C8.84064305,4.15935695 9.1593509,4.15929778 9.3559202,4.35580156 L11.6440798,6.64319844 C11.838707,6.83776073 11.8402755,7.15874732 11.6432453,7.35580563 L5.35675466,13.6431944 C5.15935695,13.8406203 4.7782068,14 4.50461102,14 L2.49538898,14 C2.2157526,14 2,13.7782068 2,13.504611 L2,11.495389 C2,11.2157526 2.1597245,10.8402755 2.35675466,10.6432453 Z M12.7109951,1.71135812 L14.2896049,3.28944188 C14.6796404,3.67934745 14.6824243,4.31845743 14.2896881,4.71080116 L13.3483476,5.65120077 C13.1568151,5.84254182 12.8404491,5.84010222 12.6438798,5.64359844 L10.3557202,3.35620156 C10.161093,3.16163927 10.1557721,2.84442791 10.3481734,2.65202659 L11.2890435,1.71115654 C11.6873,1.3129 12.3182129,1.31870679 12.7109951,1.71135812 Z'
                                        ></path>
                                    </svg>
                                </div>
                                <div
                                    onClick={() => {
                                        setCurrentExpenseId(el.expenseId);
                                        setDeleteExpenseModal(!deleteExpenseModal);
                                    }}
                                >
                                    <svg viewBox='0 0 16 16' className='svg-icon--20 icon__delete'>
                                        <path
                                            fillRule='evenodd'
                                            fill='currentColor'
                                            d='M4,7.50639765 C4,6.6744372 4.66831553,6 5.50473881,6 L10.4952612,6 C11.3263055,6 12,6.67646277 12,7.50639765 L12,13.0026083 C12,14.1057373 11.1132936,15 10.0018986,15 L5.99810135,15 C4.89458045,15 4,14.1041422 4,13.0026083 L4,7.50639765 Z M11,3 L5,3 L5,1.5 C5,1.225 5.225,1 5.5,1 L10.5,1 C10.775,1 11,1.225 11,1.5 L11,3 Z M3,4 C3,3.44771525 3.4556644,3 3.99539757,3 L12.0046024,3 C12.5543453,3 13,3.44386482 13,4 C13,4.55228475 12.5443356,5 12.0046024,5 L3.99539757,5 C3.44565467,5 3,4.55613518 3,4 Z M6,3 L10,3 L10,2 L6,2 L6,3 Z'
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </MyExpenses>
                    );
                })}
            </div>

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
                    handleRefresh={handleRefresh}
                    handleBudgetRefresh={handleBudgetRefresh}
                />
            ) : null}
            <div>예산 사용량</div>
            <div>{budgetUsage()} %</div>
        </BudgetContainer>
    );
};

export default Budget;

const BudgetContainer = styled.div`
  .my-expense__container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
  }
`;

const CurrentBudget = styled.div`
  padding-bottom: var(--spacing-3);
  border-bottom: 1px solid var(--light-gray-4);

  .budget__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-4);

    > .plan__heading {
      color: var(--primary-blue-bright);
    }
  }

  .budget__current-amount {
    font-size: 40px;
    line-height: 52px;
    font-weight: bold;
    color: var(--black);
  }
`;

const Expense = styled.div`
  margin-top: var(--spacing-3);

  .expense__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-4);
  }
`;

const MyExpenses = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;

  &:hover .expense__controls {
    opacity: 1;
  }

  .expense__item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    width: 100%;
  }

  .expense__item-top {
    display: flex;
    gap: var(--spacing-3);
    justify-content: space-between;
    width: calc(50vw - 100px);

    > * {
      font-size: var(--large-text-size);
      line-height: var(--large-text-line-height);
      font-weight: 600;
      color: var(--dark-gray-1);
    }
  }

  .expense__item-date {
    color: var(--light);
    text-transform: capitalize;
  }

  .expense__message {
    color: var(--light);
  }

  .expense__controls {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    position: relative;
    height: 100%;
    opacity: 0;

    > div {
      height: 20px;
      cursor: pointer;
    }

    .svg-icon--20 {
      position: relative;
      height: 20px;
      margin-left: var(--spacing-2);

      > path {
        fill: var(--light-gray-4);
      }

      &.icon__edit {
        &:hover {
          > path {
            fill: var(--primary-blue-light-1);
          }
        }
      }

      &.icon__delete {
        &:hover {
          > path {
            fill: var(--red-light-1);
          }
        }
      }
    }
  }
`;

const AddExpenseBtn = styled.div`
  cursor: pointer;
`;
