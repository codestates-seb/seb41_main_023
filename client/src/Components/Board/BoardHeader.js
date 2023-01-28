import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Mode } from '../../Util/constants';

const BoardHeader = ({
  mainData,
  mode,
  handleCreateLog,
  handleEditLog,
  handleDeleteLog,
  title,
  setTitle,
  content,
}) => {
  const navigate = useNavigate();

  return (
    <TopContainer>
      <div className="top__gradient-bg"></div>
      <Header>
        <div className="header__logo back__button" onClick={() => navigate(-1)}>
          Back
        </div>
        <div className="top__button-container">
          {mode === Mode.Write ? (
            <button
              className="button--primary"
              onClick={() => {
                handleCreateLog(title, content);
              }}
            >
              Save log
            </button>
          ) : (
            <>
              <button
                className="button--primary"
                onClick={() => {
                  handleEditLog(title, content);
                }}
              >
                Save edits
              </button>
              <button
                className="button--default button--subtle"
                onClick={handleDeleteLog}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </Header>
      <TripInfo>
        <div className="city-name__label">{mainData.cityName}</div>
        <input onChange={e => setTitle(e.target.value)} value={title} />
      </TripInfo>
    </TopContainer>
  );
};

export default BoardHeader;

const TopContainer = styled.nav`
  position: relative;
  width: 50vw;
  height: 350px;
  background-color: var(--primary-blue-light-1);
  background-image: url(${props => props.cityImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: default;

  .top__gradient-bg {
    position: absolute;
    top: 0;
    width: 50vw;
    height: 350px;
    background: rgb(15, 15, 15);
    background: -moz-linear-gradient(
      0deg,
      rgba(15, 15, 15, 0.5) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    background: -webkit-linear-gradient(
      0deg,
      rgba(15, 15, 15, 0.5) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    background: linear-gradient(
      0deg,
      rgba(15, 15, 15, 0.5) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0f0f0f",endColorstr="#ffffff",GradientType=1);
    z-index: 1;
  }
`;

const Header = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 50px;
  height: 60px;
  width: calc(50vw - 100px);
  z-index: 100;

  > * {
    cursor: pointer;
  }

  .top__button-container {
    display: flex;
    gap: var(--spacing-2);

    > .button--subtle {
      color: var(--dark-gray-2);
    }
  }
`;

const TripInfo = styled.div`
  position: absolute;
  bottom: 50px;
  margin: 0 50px;
  width: calc(50vw - 100px);
  z-index: 100;

  .city-name__label {
    display: inline-block;
    margin-bottom: var(--spacing-3);
    padding: 6px var(--spacing-2);
    background-color: var(--primary-blue-dark);
    color: var(--light-gray-3);
    font-size: var(--small-text-size);
    line-height: var(--samll-text-line-height);
    font-weight: 500;
    border-radius: 3px;
  }

  > input {
    display: block;
    font-size: var(--xx-large-heading-font-size);
    line-height: var(--xx-large-heading-line-height);
    color: var(--white);
    border: 0;
    outline: 0;
    background-color: transparent;
    cursor: pointer;
    padding-bottom: var(--spacing-2);
    border-bottom: 2px solid transparent;

    &:focus {
      border: 0;
      box-shadow: none;
      border-bottom: 2px solid var(--primary-blue-light-2);
    }
  }
`;
