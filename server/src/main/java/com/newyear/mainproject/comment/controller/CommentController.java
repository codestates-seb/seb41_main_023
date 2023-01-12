package com.newyear.mainproject.comment.controller;

import com.newyear.mainproject.comment.dto.CommentDto;
import com.newyear.mainproject.comment.entity.Comment;
import com.newyear.mainproject.comment.mapper.CommentMapper;
import com.newyear.mainproject.comment.service.CommentService;
import com.newyear.mainproject.dto.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@Validated
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper mapper;

    @PostMapping("/board/{board-id}")
    public ResponseEntity postComment(@PathVariable("board-id") @Positive long boardId,
                                      @RequestBody @Valid CommentDto.Post post) {
        Comment comment = commentService.createComment(mapper.postDtoToComment(post, boardId));
        return new ResponseEntity<>(mapper.commentToResponseDto(comment), HttpStatus.OK);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @RequestBody @Valid CommentDto.Patch patch) {
        patch.setCommentId(commentId);
        Comment comment = commentService.updateComment(mapper.patchDtoToComment(patch));
        return new ResponseEntity<>(mapper.commentToResponseDto(comment), HttpStatus.OK);
    }

    @DeleteMapping("{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/board/{board-id}")
    public ResponseEntity getComments(@PathVariable("board-id") @Positive long boardId,
                                      @RequestParam @Positive int page,
                                      @RequestParam @Positive int size) {
        Page<Comment> pages = commentService.findComments(page-1, size, boardId);
        List<Comment> comments = pages.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.commentsToResponseDto(comments), pages), HttpStatus.OK);
    }
}
