import styled from "styled-components";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Mode } from "../../Util/constants";

const BoardHeader = ({
  mainData,
  mode,
  handleCreateLog,
  title,
  setTitle,
  content,
}) => {
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
        {mode === Mode.Write ? (
          <SaveButton
            onClick={() => {
              handleCreateLog(title, content);
            }}
          >
            Save travel log
          </SaveButton>
        ) : (
          <>
            <SaveButton>Save edits</SaveButton>
            <SaveButton>Delete</SaveButton>
          </>
        )}
      </LogoButtonContainer>
      <TripTitleContainer>
        <h1>{mainData.cityName}</h1>
        <input onChange={(e) => setTitle(e.target.value)} value={title} />
        {moment(mainData.startDate).format("M월 D일")} ~
        {moment(mainData.endDate).format("M월 D일")}
      </TripTitleContainer>
    </TopNavBar>
  );
};

export default BoardHeader;

const TopNavBar = styled.nav`
  border-bottom: 1px solid #e9ecef;
  margin: 20px;
  display: flex;
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
  background-color: #4f4f4f;
  color: white;
`;

const TripTitleContainer = styled.div`
  width: auto;
`;
