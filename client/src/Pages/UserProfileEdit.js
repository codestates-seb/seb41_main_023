import styled from "styled-components";
import { useState } from "react";

import Header from "../Components/Header";
import Modal from "../Components/Modal";
import { Navigate, useNavigate } from "react-router-dom";

const UserProfileEditContainer = styled.div``;

const UserMetaContainer = styled.div`
  margin: 70px 100px 50px;
  .user_meta {
    display: flex;
    flex-direction: row;

    .user_meta_left {
      display: flex;
      align-items: center;

      margin-right: 20px;
    }
  }
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: row;
  margin: 40px 100px;
`;

const TabMenu = styled.div`
  > li {
    list-style: none;
    margin: 15px 20px 15px 0;
    cursor: pointer;
  }
`;

const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  & .input_area {
    > input {
      width: 97%;
      margin: 10px 0;
      padding: 7px;
    }
  }

  > .submit_area {
    text-align: end;
    > button {
      cursor: pointer;
    }
  }
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;

  & .input_area {
    > input {
      width: 97%;
      margin: 10px 0;
      padding: 7px;
    }
  }

  > .submit_area {
    text-align: end;
    > button {
      cursor: pointer;
    }
  }
`;

// 탭 컴포넌트
export const General = () => {
  return (
    <GeneralContainer>
      <div className="input_area">
        <div>Usermane</div>
        <input></input>
        <div>Email</div>
        <input></input>
      </div>
      <div className="submit_area">
        <button>Save Changes</button>
      </div>
    </GeneralContainer>
  );
};

export const Password = () => {
  return (
    <PasswordContainer>
      <div className="input_area">
        <div>Old password</div>
        <input></input>
        <div>New password</div>
        <input></input>
        <div>
          Passwords must contain at least eight characters, including at least 1
          letter and 1 number.
        </div>
      </div>
      <div className="submit_area">
        <button>Save Changes</button>
      </div>
    </PasswordContainer>
  );
};

export const DeleteAccount = ({ modal, setModal }) => {
  const navigate = useNavigate();
  const handleDeleteAccount = () => {
    console.log("계정 삭제!");
    navigate("/");
  };

  return (
    <>
      {modal ? (
        <Modal
          setModal={setModal}
          title="Do you want to delete your account?"
          content="Deleting your account will permanently delete your account, trip plans, logs,and other documents associated with your account."
          buttonName="Delete Account"
          handleClick={handleDeleteAccount}
        />
      ) : null}
    </>
  );
};

const UserProfileEdit = () => {
  const [currentTab, clickTab] = useState(0);
  const [modal, setModal] = useState(false);

  const menuArr = [
    { name: "General", content: <General /> },
    { name: "Password", content: <Password /> },
    {
      name: "Delete account",
      content: <DeleteAccount modal={modal} setModal={setModal} />,
    },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  return (
    <UserProfileEditContainer>
      <Header login={true} />
      <UserMetaContainer>
        <div className="user_meta">
          <div className="user_meta_left">
            <div>프로필 이미지</div>
          </div>
          <div className="user_meta_right">
            <div>유저 아이디</div>
            <div>유저 이메일</div>
          </div>
        </div>
      </UserMetaContainer>
      <SideBar>
        <TabMenu>
          {menuArr.map((el, index) => (
            <li
              key={el.name}
              className={index === currentTab ? "submenu focused" : "submenu"}
              onClick={() => {
                selectMenuHandler(index);
                if (el.name === "Delete account") setModal(true);
              }}
            >
              {el.name}
            </li>
          ))}
        </TabMenu>
        <div>{menuArr[currentTab].content}</div>
      </SideBar>
    </UserProfileEditContainer>
  );
};

export default UserProfileEdit;
