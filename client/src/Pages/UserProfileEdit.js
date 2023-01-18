import styled from "styled-components";
import axios from "axios";
import { useState, useRef, useCallback, useEffect } from "react";

import Header from "../Components/Header";
import { General, Password, DeleteAccount } from "../Components/user/Tab";

import { getCookie } from "../Util/Cookies";

// import { getData, patchData, postData } from '../Util/api';
import Footer from "./Footer";

const UserProfileEdit = () => {
  const memberId = getCookie("memberId");
  const token = getCookie("accessToken");
  const [currentTab, clickTab] = useState(0);
  const [modal, setModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [submitInfo, setSubmitInfo] = useState({
    id: "",
  });
  const nameRef = useRef([]);

  const handleChange = (e) => {
    setSubmitInfo({
      ...submitInfo,
      [e.target.name]: e.target.value,
    });
  };

  const [refresh, setRefresh] = useState(1);

  //refresh function
  const handleRefresh = () => {
    setRefresh(refresh * -1);
  };

  // const getUserInfo = async () => {
  //   const data = await getData(`/members/userProfile/${memberId}`);
  //   setUserInfo(data);
  // };

  // 유저 정보 요청
  const getUserInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/members/userProfile/${memberId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setUserInfo(res.data));
  };

  useEffect(() => {
    getUserInfo();
  }, [refresh]);

  //유저 정보 patch 요청
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!submitInfo.id) {
      nameRef.current.focus();
    } else {
      const data = {
        displayName: submitInfo.id,
      };

      if (window.confirm("수정사항을 저장하시겠습니까?")) {
        axios
          .patch(
            `${process.env.REACT_APP_API_URL}/members/displayName/${memberId}`,
            { ...data },
            { headers: { Authorization: token } }
          )
          .then((res) => {
            setUserInfo({ ...userInfo, displayName: res.data.displayName });
            nameRef.current.value = "";
          });
      }
    }
  };

  const menuArr = [
    {
      name: "General",
      content: (
        <General
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          nameRef={nameRef}
        />
      ),
    },
    { name: "Password", content: <Password /> },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  //프로필 이미지 변경
  const SettingUserThumbnail = () => {
    const inputRef = useRef(null);

    const onUploadImage = async (e) => {
      if (!e.target.files) {
        return;
      }
      if (window.confirm("프로필을 변경하시겠습니까?")) {
        const formData = new FormData();
        //formData.append : FormData 객체안에 이미 키가 존재하면 그 키에 새로운 값을 추가하고, 키가 없으면 추가
        formData.append("multipartFile", e.target.files[0]);
        await axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}/members/${memberId}/profile`,
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        }).then((res) => {
          setUserInfo({ ...userInfo, profileImage: res.data.profileImage });
          handleRefresh();
        });
      }
    };

    const onUploadImageButtonClick = useCallback(() => {
      if (!inputRef.current) {
        return;
      }
      inputRef.current.click();
    }, []);

    return (
      <SettingUserThumbnailContainer>
        <input
          type="file"
          accept="image/*"
          name="thumbnail"
          ref={inputRef}
          onChange={onUploadImage}
        />
        <button
          className="upload_Image"
          label="Edit image"
          onClick={onUploadImageButtonClick}
        >
          Edit image
        </button>
      </SettingUserThumbnailContainer>
    );
  };

  return (
    <Container>
      <Header login={true} />
      <Main>
        <TopContainer>
          <div className="user_meta_left">
            <img
              className="profile_image"
              alt="profile_image"
              src={userInfo.profileImage}
            />
            <SettingUserThumbnail />
          </div>
          <div className="user_meta_right">
            <div className="display_name">{userInfo.displayName}</div>
            <div className="email">{userInfo.email}</div>
          </div>
        </TopContainer>
        <MainContainer>
          <SideBarMenu>
            {menuArr.map((el, index) => (
              <li
                key={el.name}
                className={index === currentTab ? "submenu focused" : "submenu"}
                onClick={() => {
                  selectMenuHandler(index);
                }}
              >
                {el.name}
              </li>
            ))}
            <li onClick={() => setModal(true)}>Delete account</li>
            <li>
              <DeleteAccount modal={modal} setModal={setModal} />
            </li>
          </SideBarMenu>
          <div className="main__content">{menuArr[currentTab].content}</div>
        </MainContainer>
      </Main>
      <Footer />
    </Container>
  );
};

export default UserProfileEdit;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;

  & .header__container {
    top: 0;
  }
`;

const Main = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 160px;
  max-width: 900px;
  cursor: default;
`;

const TopContainer = styled.div`
  position: relative;
  display: flex;
  gap: var(--spacing-4);
  align-items: center;

  .user_meta_left {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: var(--primary-blue-bright);

    > img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
  }

  .user_meta_right {
    .display_name {
      margin-bottom: var(--spacing-1);
      font-size: var(--default-heading-font-size);
      line-height: var(--default-heading-line-height);
      color: var(--dark-gray-1);
    }

    .email {
      color: var(--light);
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  gap: 100px;
  margin: 50px 0;

  > .main__content {
    width: 100%;
    min-height: 250px;
  }
`;

const SideBarMenu = styled.ul`
  display: flex;
  gap: var(--spacing-3);
  flex-direction: column;
  min-width: 110px;

  > li {
    color: var(--light);
    list-style: none;
    cursor: pointer;

    &:hover {
      color: var(--dark-gray-2);
    }

    &.focused {
      color: var(--primary-blue-bright);
      font-weight: 600;
    }
  }
`;

const SettingUserThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.25);
    transition: background-color 0.1s ease-in;
  }

  > input {
    display: none;
  }

  > button {
    position: absolute;
    bottom: var(--spacing-3);
    background-color: transparent;
    color: var(--white);
    outline: 0;
    border: 0;
    opacity: 0;

    ${Main} > div :hover & {
      opacity: 1;
      transition: opacity 0.1s ease-in;
    }
  }
`;
