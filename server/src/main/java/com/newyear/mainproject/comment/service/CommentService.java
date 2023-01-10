package com.newyear.mainproject.comment.service;

import com.newyear.mainproject.board.entity.Board;
import com.newyear.mainproject.board.service.BoardService;
import com.newyear.mainproject.comment.entity.Comment;
import com.newyear.mainproject.comment.repository.CommentRepository;
import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardService boardService;
    private final MemberService memberService;

    public Comment createComment(Comment comment) {
        Board board = boardService.findBoard(comment.getBoard().getBoardId());
        Member member = memberService.getLoginMember();
        board.addComment(comment);
        comment.setBoard(board);
        comment.setMember(member);

        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        Comment findComment = verifyExistComment(comment.getCommentId());
        //작성자 아닐 경우 접근 불가
        if (!findComment.getMember().getEmail().equals(memberService.getLoginMember().getEmail())) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }
        Optional.ofNullable(comment.getComment())
                .ifPresent(findComment::setComment);
        return commentRepository.save(findComment);
    }

    //게시물에 대한 댓글 조회 - 오래된 순
    @Transactional(readOnly = true)
    public Page<Comment> findComments(int page, int size, long boardId) {
        Board board = boardService.findBoard(boardId);
        return commentRepository.findAllByboard(PageRequest.of(page, size, Sort.by("commentId").descending()), board);
    }

    public void deleteComment(long commentId) {
        Comment findComment = verifyExistComment(commentId);
        //작성자 아닐 경우 접근 불가
        if (!findComment.getMember().getEmail().equals(memberService.getLoginMember().getEmail())) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }
        commentRepository.deleteById(commentId);
    }

    private Comment verifyExistComment(long commentId) {
        return commentRepository.findById(commentId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}
