package com.newyear.mainproject.board.likes;

import com.newyear.mainproject.board.entity.Board;
import com.newyear.mainproject.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter @Setter
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likesId;

    private int likes;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "boardId")
    private Board board;

    public Likes(int likes, Member member, Board board) {
        this.likes = likes;
        this.member = member;
        this.board = board;
    }
}
