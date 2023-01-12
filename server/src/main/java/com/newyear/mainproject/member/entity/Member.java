package com.newyear.mainproject.member.entity;

import com.newyear.mainproject.board.entity.Board;
import com.newyear.mainproject.comment.entity.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@Getter @Setter
@Entity
public class Member{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false) //updatable = false 추가하기
    private String email;

    @Column(nullable = false)
    private String displayName;

    @Column(length = 100)
    private String password;

    @Column(nullable = false)
    private String profileImage;

    @Column(nullable = false)
    private String profileKey;

    @Column
    private long trips;

    @Column
    private long cities;

    @CreatedDate
    @Column(updatable = false) //update 시, createdAt null 문제로 updatable = false 추가
    private LocalDateTime createdAt;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @OneToMany(mappedBy = "member")
    private List<Board> boards = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    public enum MemberStatus{
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status){this.status = status;}
    }

}
