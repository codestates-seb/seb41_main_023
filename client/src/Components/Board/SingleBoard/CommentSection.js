import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import axios from "axios";
import {getCookie} from "../../../Util/Cookies";
import SingleComment from "./SingleComment";
import Pagination from "../../../Util/Pagination";

const CommentSection = ({boardData}) => {
    const {boardId} = useParams();
    const [commentList, setCommentList] = useState([]);
    const [commentRefresh, setCommentRefresh] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const offset = (page - 1) * limit;
    const commentRef = useRef();

    const handleCommentRefresh = () => {
        setCommentRefresh(prevState => prevState * -1);
    };

    const handleCommentSubmit = () => {
        const commentData = {"comment": commentRef.current.value};

        axios.post(`${process.env.REACT_APP_API_URL}/comments/board/${boardId}`, commentData,
            {
                headers: {
                    Authorization: getCookie('accessToken'),
                }
            })
            .then((res) => {
                handleCommentRefresh()
                commentRef.current.value = '';
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/comments/board/${boardId}?page=1&size=100`, {
            headers: {
                Authorization: getCookie('accessToken')
            }
        })
            .then((res) => {
                setCommentList(res.data.data);
            })
            .catch((err) => console.log(err))
    }, [boardId, commentRefresh]);

    return (
        <CommentWrapper>
            <CommentContainer>
                <div className={'comment_counts'}>{commentList.length} Comments</div>
                {commentList &&
                    commentList.slice(offset, offset + limit).map((comment) => (
                        <SingleComment
                            key={comment.commentId}
                            comment={comment}
                            commentId={comment.commentId}
                            handleCommentRefresh={handleCommentRefresh}
                            memberId={comment.memberId}
                        />
                    ))
                }
                <div className={'comment_input_container'}>
                    <div className={'comment_user_profile'}>
                        <img src={boardData.profileImage} alt={`${boardData.displayName}의 이미지`}/>
                    </div>
                    <div className={'comment_input_box'}>
                        <input
                            type={'text'}
                            placeholder={'Add a question or share your opinion!!'}
                            ref={commentRef}
                        />
                    </div>
                    <div
                        className={'comment_submit_button'}
                        onClick={handleCommentSubmit}
                    >
                        <button>Post Comment</button>
                    </div>
                </div>
            </CommentContainer>
            <Pagination
                total={commentList.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />
        </CommentWrapper>
    )
};

export default CommentSection;

const CommentWrapper = styled.div`
  width: 50vw;
  height: auto;
  padding: 130px 20px 50px 20px;
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .comment_counts {
    font-size: 25px;
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

  .comment_input_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .comment_input_box {
      width: 80%;
      display: flex;
      justify-content: center;

      input {
        width: 100%;
        margin: auto;
      }
    }

    .comment_submit_button {
      button {
        padding: 10px 20px;
        border-radius: 10px;
        background-color: #4F4F4F;
        color: white;
      }
    }
  }
`;