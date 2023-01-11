import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const TopNavBar = styled.nav`
  border-bottom: 1px solid #e9ecef;
  margin: 20px;
  position: fixed;
  display: flex;
  width: 910px;
  height: 200px;
  left: 0;
  right: 0;
  top: 0;
  padding: 0;
  z-index: 50;
  background-color: white !important;
  flex-flow: column nowrap;
`;

const LogoButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  cursor: pointer;

  img {
    margin-right: 15px;
    border-radius: 50%;
  }
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  margin: 0 20px;
  padding: 5px 10px;
  border-radius: 2rem;
  background-color: #4F4F4F;
  color: white;
`;

const TripTitleContainer = styled.div`
  height: calc(200px - 80px);
  width: auto;
  
  h1 {
    margin-top: 70px;
  }
  
  p {
    margin-top: 20px;
  }
`;

const TopNavigation = (props) => {
    const navigate = useNavigate();

    return (
        <TopNavBar>
            <LogoButtonContainer>
                <Logo>
                    <img
                        alt="logo_image"
                        src="https://picsum.photos/40"
                        onClick={() => navigate("/")}
                    />
                </Logo>
                <SaveButton>Save Trip</SaveButton>
            </LogoButtonContainer>
            <TripTitleContainer>
                <h1>Trip to Seoul</h1>
                <p>1월 3일 - 1월 5일</p>
            </TripTitleContainer>
        </TopNavBar>
    )
};

export default TopNavigation;