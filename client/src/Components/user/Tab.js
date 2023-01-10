/* 유저이름, 비밀번호 수정, 계정 삭제 */

import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "./Modal";

// const [token, setToken] = useState();
// const [memberId,setMemberId] = useState();

// 토큰 설정
// useEffect(() => {
//   if (cookies.accessToken) {
//     setToken(cookies.accessToken.token)
//   }
// }, []);

//memberId 설정

// 유저이름 수정
const General = ({ handleChange, handleSubmit, nameRef }) => {
  return (
    <GeneralContainer>
      <div className="input_area">
        <div>Username</div>
        <input
          onChange={handleChange}
          name="id"
          id="username"
          ref={nameRef}
        ></input>
      </div>
      <div className="submit_area">
        <button onClick={handleSubmit}>Save Changes</button>
      </div>
    </GeneralContainer>
  );
};

// 비밀번호 수정
const Password = () => {
  const [inputs, setInputs] = useState({
    originPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const data = {
      ...inputs,
      [name]: value,
    };

    setInputs(data);
  };

  const submitPassword = () => {
    //유효성 검사(숫자, 영문, 특수문자 조합한 8~20자리)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,}$/i;

    const passwordValueCheck = passwordRegex.test(inputs.newPassword);
    if (!passwordValueCheck) {
      return;
    }

    console.log("change!");

    // 비밀번호 변경 요청
    // axios
    //   .patch(`${process.env.REACT_APP_API_URL}/members/password/${memberId}`, {
    //     headers: {
    //       Authorization: token,
    //       withCredentials: true,
    //     },
    //     data : {
    //       originPassword : inputs.originPassword,
    //       password : inputs.newPassword
    // }
    //   })
    //   .then((res) => {
    //     alert("비밀번호가 변경되었습니다.");
    // setInputs({
    //   originPassword: "",
    //   newPassword: "",
    // });
    //     window.location.reload();
    //   })
    //   .catch((err) => console.log("error"));
  };

  return (
    <PasswordContainer>
      <div className="input_area">
        <div>Old password</div>
        <input
          type="password"
          name="originPassword"
          value={inputs.originPassword}
          onChange={handleChange}
        ></input>
        <div>New password</div>
        <input
          type="password"
          name="newPassword"
          value={inputs.newPassword}
          onChange={handleChange}
        ></input>
        <div>
          숫자, 영문, 특수문자(!, & 등)를 조합한 8~20자리의 비밀번호를
          입력하세요.
        </div>
      </div>
      <div className="submit_area">
        <button onClick={submitPassword}>Save Changes</button>
      </div>
    </PasswordContainer>
  );
};

/* 계정 삭제 */
const DeleteAccount = ({ modal, setModal }) => {
  const navigate = useNavigate();
  const handleDeleteAccount = () => {
    // axios
    //   .delete(`${process.env.REACT_APP_API_URL}/members/${memberId}`, {
    //     headers: {
    //       Authorization: token,
    //       withCredentials: true,
    //     },
    //   })
    //   .then((res) => {
    //     removeCookie("쿠키 이름");
    //     alert("그동안 이용해주셔서 감사합니다.");
    //     navigate("/");
    //     window.location.reload();
    //   })
    //   .catch((err) => console.log("error"));
    console.log("계정 삭제!");
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

export { General, Password, DeleteAccount };

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
