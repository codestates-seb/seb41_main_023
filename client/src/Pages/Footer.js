import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  bottom: 0;
  width: 100vw;
  height: 350px;
  background-color: var(--light-gray-1);
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
    margin: 50px 50px 0 80px;

    > div {
      font-size: 23px;
      font-weight: 600;
      margin-top: 10px;
    }

    .github_link {
      margin-top: 70px;
      font-size: 17px;
      text-align: center;
      font-weight: 600;
      background-color: var(--light-gray-3);
      color: rgba(0, 0, 0, 0.5);

      padding: 15px;

      :hover {
        background-color: rgba(0, 0, 0, 0.5);
        color: whitesmoke;
      }
    }

    p {
      margin: 30px 0;
      font-size: 14px;
    }

    > * {
      color: rgba(0, 0, 0, 0.8);
    }
  }

  .contact__us {
    margin: 50px 50px 0 50px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    > .title {
      font-size: 23px;
      font-weight: 600;
      margin-top: 10px;
    }

    .team__intro {
      display: flex;
      flex-direction: row;

      > div {
        a {
          font-size: 14px;
        }

        .team__title {
          margin-bottom: 20px;
          font-size: 18px;
        }

        margin-left: 10px;
        margin-right: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;

        > * {
          color: rgba(0, 0, 0, 0.8);

          :hover {
            color: darkgreen;
          }
        }
      }
    }
  }
`;

function Footer(props) {
  return (
    <Container className="footer">
      <div className="about__us">
        <div>About Us</div>
        <p>코드스테이츠 41기 23조 뉴이어의 프로젝트입니다</p>
        <a
          className="github_link"
          href={'https://github.com/codestates-seb/seb41_main_023'}
          target="_blank"
          rel="noreferrer"
        >
          Our GitHub Repository
        </a>
      </div>
      <div className="contact__us">
        <div className="title">Contact Us</div>
        <div className="team__intro">
          <div className="front__end">
            <h3 className="team__title">Front-End</h3>
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
            <h3 className="team__title">Back-End</h3>
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
