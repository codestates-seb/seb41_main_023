import {Fragment, useRef, useState} from "react";
import axios from "axios";
import {getCookie} from "../../../Util/Cookies";
import styled from "styled-components";

const SingleComment = ({comment, commentId, handleCommentRefresh, memberId}) => {
    const userMemberId = Number(getCookie('memberId'));
    const [isEdit, setIsEdit] = useState(false);
    const editRef = useRef();
    const handleEditMode = () => {
        setIsEdit(prevState => !prevState);
    };

    const handleEditComment = (commentId) => {
        const editedComment = {"comment": editRef.current.value};
        axios.patch(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, editedComment, {
            headers: {
                Authorization: getCookie('accessToken')
            }
        })
            .then((res) => {
                handleCommentRefresh();
                setIsEdit(false);
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alert(`댓글은 ${err.response.data.fieldErrors[0].reason}. 최소 1글자 입력 후 수정 버튼을 눌러주세요!`)
                }
            })
    };

    const handleDeleteComment = (commentId) => {
        if (window.confirm('댓글을 삭제하시겠습니까?')) {
            axios.delete(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, {
                headers: {
                    Authorization: getCookie('accessToken')
                }
            })
                .then((res) => handleCommentRefresh())
                .catch((err) => console.log(err));
        }
    }

    return (
        <SingleCommentWrapper
        >
            <div className={'comment_user_profile'}>
                <img src={comment.profileImage} alt={`${comment.displayName}의 이미지`}/>
            </div>
            <div className={'single_comment_content'}
                 onClick={handleEditMode}
            >
                {userMemberId === memberId ? (
                    <Fragment>
                        {isEdit ? (
                            <input
                                type={'text'}
                                placeholder={`${comment.comment}`}
                                ref={editRef}
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleEditComment(commentId)
                                    }
                                }}
                            />
                        ) : (
                            <div className={'edit_member_container'}>
                                <div className={'edit_single_comment_name_createdAt'}>
                                    <span className={'edit_user_name'}>{comment.displayName}</span>
                                    <span
                                        className={'edit_created_at'}> {comment.modifiedAt ? comment.modifiedAt : comment.createdAt}</span>
                                </div>
                                <div className={'edit_single_comment'}>
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        )}
                        <div className={'button_container'}>
                            <div className={'edit_button'}
                                 onClick={() => {
                                     handleEditComment(commentId);
                                 }}
                            >
                                <button>✏️</button>
                            </div>
                            <div className={'delete_button'}
                                 onClick={() => {
                                     handleDeleteComment(commentId);
                                 }}
                            >
                                <button>🗑️</button>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <div className={'no_edit_member_container'}>
                        <div className={'no_edit_single_comment_name_createdAt'}>
                            <span className={'user_name'}>{comment.displayName}</span>
                            <span
                                className={'created_at'}> {comment.modifiedAt ? comment.modifiedAt : comment.createdAt}</span>
                        </div>
                        <div className={'single_comment'}>
                            <p>{comment.comment}</p>
                        </div>
                    </div>
                )}
            </div>
        </SingleCommentWrapper>
    )
};

export default SingleComment;

const SingleCommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border: 1px solid lightgray;
  margin: 10px 0;
  height: auto;
  padding: 10px 7px;

  .edit_member_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;

    .edit_single_comment_name_createdAt {
      display: flex;
      flex-direction: row;
    }

    .edit_user_name {
      font-size: 14px;
      font-weight: bold;
    }

    .edit_created_at {
      padding-left: 5px;
      color: gray;
    }

    .edit_single_comment {
      padding-top: 3px;
    }
  }

  .single_comment_name_createdAt {
    display: flex;
    flex-direction: row;
  }

  .single_comment_content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    input {
      width: 100%;
      height: 35px;
    }
  ;
  }

  .user_name {
    font-size: 14px;
    font-weight: bold;
  }

  .created_at {
    padding-left: 5px;
    color: gray;
  }

  .single_comment {
    padding-top: 3px;
  }

  .comment_user_profile {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .button_container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    button {
      padding: 5px;
      background: none;
    }
  }
`;