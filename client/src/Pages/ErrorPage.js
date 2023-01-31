import styled from 'styled-components';

const ErrorPage = () => {
  return <ErrorPageContainer>404 not found</ErrorPageContainer>;
};

export default ErrorPage;

const ErrorPageContainer = styled.div`
  font-size: 70px;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
`;
