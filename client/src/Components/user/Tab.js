/* 유저이름, 비밀번호 수정, 계정 삭제 */

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCookie, removeCookie } from '../../Util/Cookies';
import { patchData } from '../../Util/api';
import axios from 'axios';

import Modal from './Modal';

// 유저이름 수정
const General = ({ handleChange, handleSubmit, nameRef }) => {
  return (
    <GeneralContainer>
      <div className="input_area">
        <label>Username</label>
        <input
          className="input"ㄱ
          onChange={handleChange}
          name="id"
          id="username"
          ref={nameRef}
          placeholder="Enter a new user name"
        ></input>
      </div>
      <div className="submit_area">
        <button className="button--primary" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </GeneralContainer>
  );
};

// 비밀번호 수정
const Password = () => {
  const memberId = getCookie('memberId');
  const [inputs, setInputs] = useState({
    originPassword: '',
    newPassword: '',
  });

  const [valueCheck, setValueCheck] = useState(true);
  //유효성 검사(숫자, 영문, 특수문자 조합한 8~20자리)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,}$/i;

  useEffect(() => {
    const passwordValueCheck = passwordRegex.test(inputs.newPassword);

    if (!passwordValueCheck) {
      setValueCheck(false);
    } else {
      setValueCheck(true);
    }
  }, [inputs.newPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const data = {
      ...inputs,
      [name]: value,
    };
    setInputs(data);
  };

  // 비밀번호 수정 요청
  const submitPassword = () => {
    const passwordValueCheck = passwordRegex.test(inputs.newPassword);

    if (!passwordValueCheck) {
      return;
    }

    patchData(`/members/password/${memberId}`, {
      originPassword: inputs.originPassword,
      password: inputs.newPassword,
    }).then((res) => {
      if (res) {
        setInputs({ originPassword: '', newPassword: '' });
        alert('비밀번호가 변경되었습니다');
      } else {
        alert('비밀번호를 확인해주세요');
      }
    });
  };

  return (
    <PasswordContainer>
      <div className="input_area">
        <label>Old password</label>
        <input
          className="input password-input"
          type="password"
          name="originPassword"
          value={inputs.originPassword}
          onChange={handleChange}
          placeholder="Enter your current password"
        ></input>
        <label>New password</label>
        <input
          className="input"
          type="password"
          name="newPassword"
          value={inputs.newPassword}
          onChange={handleChange}
          placeholder="Enter a new password"
        ></input>
        {!valueCheck ? (
          <div className="password__instruction">
            숫자, 영문, 특수문자(!, & 등)를 조합한 8~20자리의 비밀번호를 입력하세요.
          </div>
        ) : null}
      </div>
      <div className="submit_area">
        <button className="button--primary" onClick={submitPassword}>
          Save Changes
        </button>
      </div>
    </PasswordContainer>
  );
};

/* 계정 삭제 */
const DeleteAccount = ({ modal, setModal }) => {
  const memberId = getCookie('memberId');
  const token = getCookie('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/members/${memberId}`, {
        headers: {
          Authorization: token,
        },
        data: {
          accessToken: token,
          refreshToken: refreshToken,
        },
      })
      .then((res) => {
        removeCookie('accessToken');
        removeCookie('memberId');
      })
      .then((res) => {
        localStorage.removeItem('refreshToken');
        alert('그동안 이용해주셔서 감사합니다.');
      })
      .then((res) => {
        window.location.replace('/');
      })
      .catch((err) => console.log('error'));
  };

  return (
    <>
      {modal ? (
        <Modal
          setModal={setModal}
          title="Do you want to delete your account?"
          content="Deleting your account will permanently delete your account, trip plans, logs,and other documents associated with your account."
          buttonName="Delete account"
          handleClick={handleDeleteAccount}
        />
      ) : null}
    </>
  );
};

export { General, Password, DeleteAccount };

const GeneralContainer = styled.div`
  & .input_area {
    margin-bottom: calc(var(--spacing-4) - 10px);

    > label {
      margin-bottom: 6px;
      font-weight: 600;
      color: var(--dark-gray-1);
    }

    > input {
      width: 100%;
      margin: 10px 0;
      padding: 7px;
    }
  }

  > .submit_area {
    float: right;
  }
`;

const PasswordContainer = styled.div`
  & .input_area {
    margin-bottom: var(--spacing-4);

    > label {
      margin-bottom: 6px;
      font-weight: 600;
      color: var(--dark-gray-1);
    }

    > input {
      width: 100%;
      margin: 10px 0;
      padding: 7px;

      &.password-input {
        margin-bottom: var(--spacing-3);
      }
    }
  }

  > .submit_area {
    float: right;
  }

  .password__instruction {
    font-size: var(--small-text-size);
    line-height: var(--small-text-line-height);
    color: var(--light);
  }
`;
