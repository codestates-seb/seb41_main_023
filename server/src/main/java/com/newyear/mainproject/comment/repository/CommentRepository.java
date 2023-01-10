package com.newyear.mainproject.comment.repository;

import com.newyear.mainproject.board.entity.Board;
import com.newyear.mainproject.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findAllByboard(Pageable pageable, Board board);
}
