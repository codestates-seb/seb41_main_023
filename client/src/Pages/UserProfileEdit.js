import axios from "axios";
import styled from "styled-components";
import { useState, useRef, useCallback } from "react";

import Header from "../Components/Header";
import { General, Password, DeleteAccount } from "../Components/user/Tab";

const UserProfileEdit = () => {
  const [currentTab, clickTab] = useState(0);
  const [modal, setModal] = useState(false);

  const [token, setToken] = useState();
  const [memberId, setMemberId] = useState();

  //토큰 설정
  // useEffect(() => {
  //   if (cookies.accessToken) {
  //     setToken(cookies.accessToken.token);
  //   }
  // }, []);

  //memberId 설정

  const [userInfo, setUserInfo] = useState({
    memberId: 1,
    email: "1234@gmail.com",
    displayName: "1234",
    memberStatus: "활동중",
  });

  const [submitInfo, setSubmitInfo] = useState({
    id: "",
  });

  const [userProfile, setUserProfile] = useState("https://picsum.photos/200");

  const nameRef = useRef([]);

  const handleChange = (e) => {
    setSubmitInfo({
      ...submitInfo,
      [e.target.name]: e.target.value,
    });
  };

  //기존 유저 정보 get 요청
  // useEffect(() => {
  //   if (memberId) {
  //     axios
  //       .get(`${process.env.REACT_APP_API_URL}/members/${memberId}`, {
  //         headers: {
  //           Authorization: token,
  //           withCredentials: true,
  //         },
  //       })
  //       .then((res) => res.data.data)
  //       .then((res) => {
  //         setInfo(res);
  //       });
  //   }
  // }, [memberId]);

  // 프로필 이미지 요청
  // useEffect(() => {
  //   if (memberId) {
  //     axios
  //       .get(`${process.env.REACT_APP_API_URL}/member/profile`, {
  //         headers: {
  //           Authorization: token,
  //           withCredentials: true,
  //         },
  //       })
  //       .then((res) => res.data.data)
  //       .then((res) => {
  //         setUserProfile(res);
  //       });
  //   }
  // }, [memberId]);

  //유저 정보 patch 요청
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!submitInfo.id) {
      nameRef.current.focus();
    } else {
      const data = {
        id: submitInfo.id,
      };

      if (window.confirm("수정사항을 저장하시겠습니까?")) {
        console.log("edit! ");
        // axios
        // .patch(
        // `${process.env.REACT_APP_API_URL}/members/displayName/${memberId}`,
        // {
        //   ...data,
        // }
        // {
        //   headers: {
        //     Authorization: token,
        //   },
        // }
        // )
        // .then((res) => {
        //   window.location.reload();
        // });
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

    const onUploadImage = useCallback((e) => {
      if (!e.target.files) {
        return;
      }

      if (window.confirm("프로필을 변경하시겠습니까?")) {
        const formData = new FormData();
        //formData.append : FormData 객체안에 이미 키가 존재하면 그 키에 새로운 값을 추가하고, 키가 없으면 추가
        formData.append("image", e.target.files[0]);
        axios({
          url: `${process.env.REACT_APP_API_URL}/member/profile`, //url 수정필요
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        })
          .then((response) => {
            setUserProfile(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, []);

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
          edit image
        </button>
      </SettingUserThumbnailContainer>
    );
  };

  return (
    <UserProfileEditContainer>
      <Header login={true} />
      <UserMetaContainer>
        <div className="user_meta">
          <div className="user_meta_left">
            <img
              className="profile_image"
              alt="profile_image"
              src={userProfile}
            />
            <SettingUserThumbnail />
          </div>
          <div className="user_meta_right">
            <div className="display_name">{userInfo.displayName}</div>
            <div>{userInfo.email}</div>
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
              }}
            >
              {el.name}
            </li>
          ))}
          <li onClick={() => setModal(true)}>Delete account</li>
          <li>
            <DeleteAccount modal={modal} setModal={setModal} />
          </li>
        </TabMenu>
        <div>{menuArr[currentTab].content}</div>
      </SideBar>
    </UserProfileEditContainer>
  );
};

export default UserProfileEdit;

//style
const UserProfileEditContainer = styled.div``;

const UserMetaContainer = styled.div`
  margin: 70px 100px 50px;
  .user_meta {
    display: flex;
    flex-direction: row;

    .user_meta_left {
      position: relative;
      display: flex;
      flex-direction: column;

      margin-right: 20px;

      > img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        :hover {
          transition: 0.5s ease;
          filter: brightness(70%);
        }
      }
    }

    .user_meta_right {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .display_name {
        font-size: 19px;
        font-weight: 600;
        margin-bottom: 5px;
      }
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

const SettingUserThumbnailContainer = styled.div`
  > input {
    display: none;
  }

  > button {
    border: none;
    background: transparent;
    color: white;

    position: absolute;
    opacity: 0;
    top: 78%;
    left: 27%;

    cursor: pointer;

    ${UserMetaContainer} > div :hover & {
      opacity: 1;
      transition: 0.5s ease;
    }
  }
`;
