import { Fragment, useRef, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { getCookie } from '../../../Util/Cookies';

const SingleComment = ({
  comment,
  commentId,
  handleCommentRefresh,
  memberId,
}) => {
  const userMemberId = Number(getCookie('memberId'));
  const [isEdit, setIsEdit] = useState(false);
  const editRef = useRef();
  const [editMode, setEditMode] = useState(false);
  const handleEditMode = () => {
    setIsEdit(!isEdit);
    setEditMode(!editMode);
  };
  //수정
  const handleEditComment = commentId => {
    const editedComment = { comment: editRef.current?.value };
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/comments/${commentId}`,
        editedComment,
        {
          headers: {
            Authorization: getCookie('accessToken'),
          },
        },
      )
      .then(res => {
        handleCommentRefresh();
        setIsEdit(false);
        setEditMode(!editMode);
      })
      .catch(err => {
        if (err.response.status === 400) {
          alert(
            `댓글은 ${err.response.data.fieldErrors[0].reason}. 최소 1글자 입력 후 수정 버튼을 눌러주세요!`,
          );
        }
      });
  };

  const handleDeleteComment = commentId => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, {
          headers: {
            Authorization: getCookie('accessToken'),
          },
        })
        .then(res => handleCommentRefresh())
        .catch(err => console.log(err));
    }
  };

  return (
    <SingleCommentWrapper>
      <div className="comment__user-image">
        <img
          src={comment.profileImage}
          alt={`${comment.displayName}의 이미지`}
        />
      </div>
      <div className="comment__content">
        <div className="comment__main">
          <div className="comment__info">
            <span className="comment__owner">{comment.displayName}</span> ·
            <span className="comment__created">
              {' '}
              {comment.modifiedAt ? comment.modifiedAt : comment.createdAt}
            </span>
          </div>
          {userMemberId === memberId ? (
            <Fragment>
              {isEdit ? (
                <input
                  className="input--default comment__edit-input"
                  type={'text'}
                  defaultValue={`${comment.comment}`}
                  ref={editRef}
                  autoFocus
                  onKeyUp={e => {
                    if (e.key === 'Enter') {
                      return handleEditComment(commentId);
                    }
                  }}
                />
              ) : (
                <div className="comment__text">
                  <p>{comment.comment}</p>
                </div>
              )}
            </Fragment>
          ) : (
            <div className="comment__text">
              <p>{comment.comment}</p>
            </div>
          )}
        </div>
        {userMemberId === memberId ? (
          <div className="comment__controls">
            <button
              onClick={() => {
                editMode ? handleEditComment(commentId) : handleEditMode();
              }}
            >
              <svg viewBox="0 0 16 16" className="svg-icon--20 icon__edit">
                <path
                  fillRule="evenodd"
                  fill="currentColor"
                  d="M2.35675466,10.6432453 L8.64324534,4.35675466 C8.84064305,4.15935695 9.1593509,4.15929778 9.3559202,4.35580156 L11.6440798,6.64319844 C11.838707,6.83776073 11.8402755,7.15874732 11.6432453,7.35580563 L5.35675466,13.6431944 C5.15935695,13.8406203 4.7782068,14 4.50461102,14 L2.49538898,14 C2.2157526,14 2,13.7782068 2,13.504611 L2,11.495389 C2,11.2157526 2.1597245,10.8402755 2.35675466,10.6432453 Z M12.7109951,1.71135812 L14.2896049,3.28944188 C14.6796404,3.67934745 14.6824243,4.31845743 14.2896881,4.71080116 L13.3483476,5.65120077 C13.1568151,5.84254182 12.8404491,5.84010222 12.6438798,5.64359844 L10.3557202,3.35620156 C10.161093,3.16163927 10.1557721,2.84442791 10.3481734,2.65202659 L11.2890435,1.71115654 C11.6873,1.3129 12.3182129,1.31870679 12.7109951,1.71135812 Z"
                ></path>
              </svg>
            </button>
            <button
              onClick={() => {
                handleDeleteComment(commentId);
              }}
            >
              <svg viewBox="0 0 16 16" className="svg-icon--20 icon__delete">
                <path
                  fillRule="evenodd"
                  fill="currentColor"
                  d="M4,7.50639765 C4,6.6744372 4.66831553,6 5.50473881,6 L10.4952612,6 C11.3263055,6 12,6.67646277 12,7.50639765 L12,13.0026083 C12,14.1057373 11.1132936,15 10.0018986,15 L5.99810135,15 C4.89458045,15 4,14.1041422 4,13.0026083 L4,7.50639765 Z M11,3 L5,3 L5,1.5 C5,1.225 5.225,1 5.5,1 L10.5,1 C10.775,1 11,1.225 11,1.5 L11,3 Z M3,4 C3,3.44771525 3.4556644,3 3.99539757,3 L12.0046024,3 C12.5543453,3 13,3.44386482 13,4 C13,4.55228475 12.5443356,5 12.0046024,5 L3.99539757,5 C3.44565467,5 3,4.55613518 3,4 Z M6,3 L10,3 L10,2 L6,2 L6,3 Z"
                ></path>
              </svg>
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </SingleCommentWrapper>
  );
};

export default SingleComment;

const SingleCommentWrapper = styled.div`
  display: flex;
  gap: var(--spacing-3);
  width: 100%;

  .comment__user-image {
    width: 50px;
    height: 50px;
    background-color: var(--primary-blue-light-2);
    border-radius: 50%;

    > img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  .comment__content {
    position: relative;

    &:hover .comment__controls {
      opacity: 1;
    }
  }

  .comment__main {
    width: calc(50vw - 166px);
  }

  .comment__info {
    margin-bottom: var(--spacing-2);

    > .comment__owner {
      font-weight: 600;
      color: var(--dark-gray-1);
    }

    > .comment__created {
      color: var(--light);
    }
  }

  .comment__edit-input {
    width: 100%;
  }

  .comment__controls {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    height: 100%;
    opacity: 0;
    right: -34px;
    top: 0;

    > button {
      background-color: transparent;
      height: 20px;
      cursor: pointer;
    }

    .svg-icon--20 {
      position: relative;
      height: 20px;
      margin-left: 0;

      > path {
        fill: var(--light-gray-4);
      }

      &.icon__edit {
        &:hover {
          > path {
            fill: var(--primary-blue-light-1);
          }
        }
      }

      &.icon__delete {
        &:hover {
          > path {
            fill: var(--red-light-1);
          }
        }
      }
    }
  }
`;
