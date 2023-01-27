import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  bottom: 0;
  width: 100vw;
  height: 350px;
  background-color: var(--light-gray-1);
  //z-index: -100;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  a {
    display: block;
    padding: 5px 0;
    cursor: pointer;
  }

  .about__us {
    margin: 30px 50px 0 50px;

    p {
      margin: 10px 0;
    }
  }

  .contact__us {
    margin: 30px 50px 0 50px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .team__intro {
      display: flex;
      flex-direction: row;

      div {
        h3 {
          font-size: 15px;
          margin: 10px 0;
        }
        margin-left: 10px;
        margin-right: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
`;

function Footer(props) {
  return (
    <Container className="footer">
      <div className="about__us">
        <h2>About Us</h2>
        <p>코드스테이츠 41기 23조 뉴이어의 프로젝트입니다</p>
        <a
          href={'https://github.com/codestates-seb/seb41_main_023'}
          target="_blank"
          rel="noreferrer"
        >
          Our GitHub
        </a>
      </div>
      <div className="contact__us">
        <h2>Contact Us</h2>
        <div className="team__intro">
          <div className="front__end">
            <h3>Front-End</h3>
            <a
              href={'https://github.com/seungheonkim'}
              target="_blank"
              rel="noreferrer"
            >
              김승헌
            </a>
            <a
              href={'https://github.com/sena-22'}
              target="_blank"
              rel="noreferrer"
            >
              김현정
            </a>
            <a
              href={'https://github.com/uk11'}
              target="_blank"
              rel="noreferrer"
            >
              이창욱
            </a>
            <a
              href={'https://github.com/ashleysyheo'}
              target="_blank"
              rel="noreferrer"
            >
              허서영
            </a>
          </div>
          <div className="back__end">
            <h3>Back-End</h3>
            <a
              href={'https://github.com/kimmj13'}
              target="_blank"
              rel="noreferrer"
            >
              김민정
            </a>
            <a
              href={'https://github.com/hyejinme'}
              target="_blank"
              rel="noreferrer"
            >
              김혜진
            </a>
            <a
              href={'https://github.com/Yujeu07'}
              target="_blank"
              rel="noreferrer"
            >
              유제웅
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Footer;
