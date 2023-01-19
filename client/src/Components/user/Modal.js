import styled from 'styled-components';

const Modal = (props) => {
  return (
    <ModalContainer onClick={() => props.setModal(false)} className="hey">
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div className="title">{props.title}</div>
          <div className="cancel-button" onClick={() => props.setModal(false)}>
            <svg viewBox="0 0 16 16" className="css-1aecrfn">
              <path
                fillRule="evenodd"
                fill="currentColor"
                d="M12.9541732,4.96004034 C13.1437497,4.77046381 13.1435266,4.45113844 12.9464351,4.25404691 L12.2459531,3.55356494 C12.0404329,3.34804477 11.7327775,3.35300891 11.5399597,3.54582678 L8,7.08578644 L4.46004034,3.54582678 C4.27046381,3.35625025 3.95113844,3.3564734 3.75404691,3.55356494 L3.05356494,4.25404691 C2.84804477,4.45956708 2.85300891,4.76722247 3.04582678,4.96004034 L6.58578644,8.5 L3.04582678,12.0399597 C2.85625025,12.2295362 2.8564734,12.5488616 3.05356494,12.7459531 L3.75404691,13.4464351 C3.95956708,13.6519552 4.26722247,13.6469911 4.46004034,13.4541732 L8,9.91421356 L11.5399597,13.4541732 C11.7295362,13.6437497 12.0488616,13.6435266 12.2459531,13.4464351 L12.9464351,12.7459531 C13.1519552,12.5404329 13.1469911,12.2327775 12.9541732,12.0399597 L9.41421356,8.5 L12.9541732,4.96004034 Z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="content">{props.content}</div>
        <div className="submit_frame">
          <div onClick={props.handleClear}>
            <button className="button--danger" onClick={props.handleClick}>
              {props.buttonName}
            </button>
          </div>
          <button className="button--default button--subtle" onClick={() => props.setModal(false)}>
            Cancel
          </button>
        </div>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
`;

const ModalWrapper = styled.div`
  padding: 24px;
  min-width: 460px;
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: 0px 0px 1px rgba(9, 30, 66, 0.31), 0px 8px 12px rgba(9, 30, 66, 0.15);

  .modal__header {
    display: flex;
    gap: var(--spacing-4);
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: var(--spacing-2);

    > .title {
      font-size: var(--default-heading-font-size);
      line-height: var(--default-heading-line-height);
      font-weight: 500;
      color: var(--red);
    }

    > .cancel-button {
      margin-top: var(--spacing-1);
      width: 18px;
      height: 18px;

      > svg path {
        color: var(--light-gray-5);
      }

      &:hover > svg path {
        color: var(--light);
      }
    }
  }

  > .content {
    margin-bottom: var(--spacing-4);
  }

  > .submit_frame {
    display: flex;
    gap: var(--spacing-2);

    > .button--subtle {
      color: var(--light);
    }
  }
`;
