import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  bottom: 0;
  width: 100vw;
  height: 350px;
  background-color: var(--light-gray-1);
  z-index: -100;
`;

function Footer(props) {
  return <Container className="footer"></Container>;
}

export default Footer;
