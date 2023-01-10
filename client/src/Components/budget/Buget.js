import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import { useEffect, useState } from "react";

import EditBudget from "./EditBudget";

//예산 식별자 필요

const Budget = () => {
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

  const [budget, setBudget] = useState(dummybudget);
  const [expenses, setExpences] = useState(dummybudget.expenses);
  const [userInfo, setUserInfo] = useState({
    image: "https://picsum.photos/40",
    memberId: 1,
    email: "newyear@gmail.com",
    displayName: "뉴이어",
    memberStatus: "활동중",
  });

  // const [token, setToken] = useState();
  //const [memberId,setMemberId] = useState();

  //토큰 설정
  // useEffect(() => {
  //   if (cookies.accessToken) {
  //     setToken(cookies.accessToken.token)
  //   }
  // }, []);

  //memberId 설정

  //예산 수정 모달
  const [editBudget, setEditBudget] = useState(false);

  /* 유저 정보 조회 */
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

  /* 예산 정보 조회 */
  //  useEffect(() => {
  // axios
  //   .get(`${process.env.REACT_APP_API_URL}/members/${memberId}`, {
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

  /* 예산 수정 요청 */
  const handleEditBudget = (inputBudget) => {
    if (inputBudget < 1) {
      window.confirm("예산은 1원 이상이어야 합니다.");
    }
    // axios
    //   .patch(`${process.env.REACT_APP_API_URL}/budget/${budget/budgetId}`, {
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
        <button>Add expenses</button>
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
`;
