import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import SingleComment from './SingleComment';

import { getCookie } from '../../../Util/Cookies';
import Pagination from '../../../Util/Pagination';

const CommentSection = () => {
  const { boardId } = useParams();
  const memberId = getCookie('memberId');
  const [memberData, setMemberData] = useState({
    profileImage: '',
  });
  const [commentList, setCommentList] = useState([]);
  const [commentRefresh, setCommentRefresh] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const offset = (page - 1) * limit;
  const commentRef = useRef();
  const handleCommentRefresh = () => {
    setCommentRefresh(prevState => prevState * -1);
  };
  //수정
  const handleCommentSubmit = () => {
    const commentData = { comment: commentRef.current?.value };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/comments/board/${boardId}`,
        commentData,
        {
          headers: {
            Authorization: getCookie('accessToken'),
          },
        },
      )
      .then(res => {
        handleCommentRefresh();
      })
      .then(res => (commentRef.current.value = ''))
      .catch(err => {
        alert(
          `댓글은 ${err.response.data.fieldErrors[0].reason}. 최소 1글자 이상 입력해주세요!`,
        );
      });
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/comments/board/${boardId}?page=1&size=100`,
        {
          headers: {
            Authorization: getCookie('accessToken'),
          },
        },
      )
      .then(res => {
        setCommentList(res.data.data);
      })
      .catch(err => console.log(err));
  }, [boardId, commentRefresh]);

  useEffect(() => {
    if (memberId) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/members/${memberId}`, {
          headers: {
            Authorization: getCookie('accessToken'),
          },
        })
        .then(res => {
          setMemberData(res.data);
        })
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <CommentWrapper>
      <h3 className="comment__heading">{commentList.length} Comments</h3>
      <div className="comment__main-container">
        <CommentContainer>
          {commentList &&
            commentList
              .slice(offset, offset + limit)
              .map(comment => (
                <SingleComment
                  key={comment.commentId}
                  comment={comment}
                  commentId={comment.commentId}
                  handleCommentRefresh={handleCommentRefresh}
                  memberId={comment.memberId}
                />
              ))}
        </CommentContainer>
        {memberId && (
          <CommentInputContainer>
            <div className="comment__user-image">
              <img
                src={memberData.profileImage}
                alt={`${memberData.displayName}의 이미지`}
              />
            </div>
            <input
              className="input--default"
              type={'text'}
              placeholder={'Add a question or share your opinion!!'}
              ref={commentRef}
            />
            <button className="button--primary" onClick={handleCommentSubmit}>
              댓글 쓰기
            </button>
          </CommentInputContainer>
        )}
      </div>
      <Pagination
        total={commentList.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </CommentWrapper>
  );
};

export default CommentSection;

const CommentWrapper = styled.div`
  padding: 0 50px;
  width: 50vw;
  margin-bottom: 50px;

  .comment__heading {
    margin-bottom: var(--spacing-4);
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    color: var(--dark-gray-1);
    font-weight: normal;
  }

  > .comment__main-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);

  > .comment__user-image {
    margin-right: var(--spacing-2);
    min-width: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;

    > img {
      min-width: 50px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  > .input--default {
    width: 100%;
  }

  > .button--primary {
    min-width: 77px;
  }
`;
