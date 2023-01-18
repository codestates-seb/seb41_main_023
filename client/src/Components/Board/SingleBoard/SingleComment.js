import styled from "styled-components";
import {Fragment, useRef, useState} from "react";
import axios from "axios";
import {getCookie} from "../../../Util/Cookies";

const SingleComment = ({comment, commentId, handleCommentRefresh}) => {
    const memberId = getCookie('memberId');
    const [isEdit, setIsEdit] = useState(false);
    const [isMouseOn, setIsMouseOn] = useState(false);
    const editRef = useRef();
    const handleEditMode = () => {
        setIsEdit(prevState => !prevState);
    };

    const handleShowButton = () => {
        setIsMouseOn(prevState => !prevState);
    }

    const handleEditComment = (commentId) => {
        const editedComment = {"comment": editRef.current.value};
        axios.patch(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, editedComment, {
            headers: {
                Authorization: getCookie('accessToken')
            }
        })
            .then((res) => {
                handleCommentRefresh();
                setIsEdit(prevState => !prevState);
            })
            .catch((err) => console.log(err))
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
            onMouseEnter={handleShowButton}
            onMouseLeave={handleShowButton}
        >
            <div className={'comment_user_profile'}>
                <img src={comment.profileImage} alt={`${comment.displayName}의 이미지`}/>
            </div>
            <div className={'single_comment_content'} onClick={handleEditMode}>
                {isEdit ? (
                    <input
                        type={'text'}
                        placeholder={`${comment.comment}`}
                        autoFocus
                        ref={editRef}
                    />
                ) : (
                    <Fragment>
                        <div className={'single_comment_name_createdAt'}>
                            <span className={'user_name'}>{comment.displayName}</span>
                            <span className={'created_at'}> {comment.createdAt}</span>
                        </div>
                        <div className={'single_comment'}>
                            <p>{comment.comment}</p>
                        </div>
                    </Fragment>
                )}
            </div>
            {/*{memberId === comment.displayName && (*/}
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
            {/*)}*/}
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

  .single_comment_content {
    width: 100%;
    height: 100%;
    cursor: pointer;

    input {
      width: 88%;
      height: 35px;
    }
  ;
  }

  .user_name {
    font-size: 14px;
    font-weight: bold;
  }

  .created_at {
    color: gray;
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