package com.newyear.mainproject.comment.mapper;

import com.newyear.mainproject.board.entity.Board;
import com.newyear.mainproject.comment.dto.CommentDto;
import com.newyear.mainproject.comment.entity.Comment;
import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.util.DateUtil;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    default Comment postDtoToComment(CommentDto.Post post, long boardId) {

        Comment comment = new Comment();
        comment.setComment(post.getComment());

        Board board = new Board();
        board.setBoardId(boardId);
        comment.setBoard(board);
        return comment;
    }

    Comment patchDtoToComment(CommentDto.Patch patch);

    CommentDto.simpleResponse commentToResponseDto (Comment comment);

    default List<CommentDto.Response> commentsToResponseDto(List<Comment> comments) {
            List<CommentDto.Response> list = new ArrayList<>(comments.size());

            for (Comment comment : comments) {
                String createdAt = DateUtil.convertLocalDatetimeToTime(comment.getCreatedAt());
                Member member = comment.getMember();
                list.add(new CommentDto.Response(comment.getCommentId(), comment.getComment(), createdAt, member.getDisplayName(), member.getProfileImage()));
            }
            return list;
    }

}
