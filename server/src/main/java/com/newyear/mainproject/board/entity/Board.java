package com.newyear.mainproject.board.entity;

import com.newyear.mainproject.audit.Auditable;
import com.newyear.mainproject.board.likes.Likes;
import com.newyear.mainproject.comment.entity.Comment;
import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.plan.entity.Plan;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Board extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @NotBlank
    private String title;

    private String content;

    private int views;

    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<Likes> likes = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;


    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setBoard(this);
    }

    public void addLike(Likes like) {
        like.setBoard(this);
        likes.add(like);
    }
}
