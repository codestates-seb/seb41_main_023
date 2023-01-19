import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCookie, removeCookie} from "../Util/Cookies";
import {postData} from "../Util/api.js";
import axios from "axios";

const Header = ({login}) => {
    const navigate = useNavigate();

    const token = getCookie("accessToken");
    const memberId = getCookie("memberId");
    const refreshToken = localStorage.getItem("refreshToken");

    const [userInfo, setUserInfo] = useState({});

    // const getUserInfo = async () => {
    //   const data = await getData(`/members/userProfile/${memberId}`);
    //   console.log(data.data);
    //   // setUserInfo(data);
    // };

    const getUserInfo = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/members/userProfile/${memberId}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) =>
                setUserInfo({...userInfo, profileImage: res.data.profileImage})
            );
    };

    useEffect(() => {
        if (token) {
            getUserInfo();
        }
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
    };

    // 로그아웃
    const handleSignout = async () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            await postData("/members/logout", {
                accessToken: token,
                refreshToken: refreshToken,
            }).then((res) => {
                removeCookie("accessToken");
                removeCookie("memberId");
                localStorage.removeItem("refreshToken");
                window.location.replace("/");
            });
        }
    };

    return (
        <HeadContainer className="header__container">
            <LeftSection>
                <div className="header__logo" onClick={() => handleNavigate("/")}>
                    website name
                </div>
                <button
                    className="button--default button--subtle"
                    onClick={() => handleNavigate("/board")}
                >
                    Travel Logs
                </button>
            </LeftSection>
            <RightSection>
                {login ? (
                    <>
                        <img
                            onClick={() => handleNavigate(`/user/${memberId}`)}
                            alt="profile_image"
                            src={userInfo.profileImage}
                        />
                        <button
                            className="button--default button--subtle"
                            onClick={handleSignout}
                        >
                            Sign out
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="button--default"
                            onClick={() => handleNavigate("/login")}
                        >
                            Log In
                        </button>
                        <button
                            className="button--primary"
                            onClick={() => handleNavigate("/signup")}
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </RightSection>
        </HeadContainer>
    );
};

export default Header;

const HeadContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  margin: 0 50px;
  width: calc(100vw - 100px);
  height: 60px;
  z-index: 9999;
  top: 0;
  left: 0;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  .header__logo {
    cursor: pointer;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);

  > img {
    width: 36px;
    height: 36px;
    border-radius: 18px;
    cursor: pointer;
  }
`;
