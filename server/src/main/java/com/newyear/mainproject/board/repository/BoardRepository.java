package com.newyear.mainproject.board.repository;

import com.newyear.mainproject.board.entity.Board;
import com.newyear.mainproject.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findByMember(Member member);
}
