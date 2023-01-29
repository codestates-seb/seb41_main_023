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

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "boardId")
    private Board board;

    public Likes(Member member, Board board) {
        this.member = member;
        this.board = board;
    }
}
