package com.newyear.mainproject.board.service;

import com.newyear.mainproject.board.entity.Board;
import com.newyear.mainproject.board.likes.Likes;
import com.newyear.mainproject.board.likes.LikesRepository;
import com.newyear.mainproject.board.repository.BoardRepository;
import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.member.service.MemberService;
import com.newyear.mainproject.plan.entity.Plan;
import com.newyear.mainproject.plan.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberService memberService;
    private final LikesRepository likesRepository;
    private final PlanService planService;

    public Board createBoard(Board board, long planId) {
        Member member = memberService.getLoginMember();
        Plan plan = planService.findPlan(planId);
        //해당 plan 작성자만 board 생성 가능
        if (!plan.getMember().equals(member)) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }
        board.setMember(member);
        board.setPlan(plan);
        return boardRepository.save(board);
    }

    public Board updateBoard(Board board) {
        Board findBoard = findExistsBoard(board.getBoardId());
        //작성자만 접근 허용
        if (!findBoard.getMember().getEmail().equals(memberService.getLoginMember().getEmail())) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }
        Optional.ofNullable(board.getTitle())
                .ifPresent(findBoard::setTitle);
        Optional.ofNullable(board.getContent())
                .ifPresent(findBoard::setContent);
        return boardRepository.save(findBoard);
    }

    public void deleteBoard(long boardId) {
        Board findBoard = findExistsBoard(boardId);
        //작성자만 접근 허용
        if (!findBoard.getMember().getEmail().equals(memberService.getLoginMember().getEmail())) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }
        boardRepository.delete(findBoard);
    }

    @Transactional(readOnly = true)
    public Board findBoard(long boardId) {
        return findExistsBoard(boardId);
    }

    @Transactional(readOnly = true)
    public Plan findPlan(long planId) {
        Plan findPlan = planService.findPlan(planId);
        //작성자만 접근 허용
        if (!findPlan.getMember().getEmail().equals(memberService.getLoginMember().getEmail())) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }
        return findPlan;
    }

    //조회수
    public void viewCount(Board board) {
        board.setViews(board.getViews() + 1);
        boardRepository.save(board);
    }

    /*
     tab=boardId : 최신순
     tab=likes : 좋아요순
     tab=views : 조회수순
     */
    @Transactional(readOnly = true)
    public Page<Board> findOptionalBoards(int page, int size, String tab) {
        return boardRepository.findAll(PageRequest.of(page, size, Sort.by(tab).descending()));
    }

    @Transactional(readOnly = true)
    public List<Board> findBoards(String tab) {
        return boardRepository.findAll(Sort.by(tab).descending());
    }

    // 지역으로 검색
    @Transactional(readOnly = true)
    public List<Board> findCityBoards(String cityName, String tab) {
        List<Board> boards = boardRepository.findAll(Sort.by(tab).descending());
        return boards.stream().filter(b -> b.getPlan().getCityName().equals(cityName)).collect(Collectors.toList());
    }

    //좋아요 등록 & 해제
    public void clickLikes(long boardId) {
        Board findBoard = findExistsBoard(boardId);
        Member member = memberService.getLoginMember();
        //이미 좋아요한 게시물일 경우 좋아요 해제
        Optional<Likes> like = findBoard.getLikes().stream().filter(l -> l.getMember().equals(member)).findAny();
        if (like.isPresent()) {
            likesRepository.deleteById(like.get().getLikesId());
        }
        //좋아요
        else {
            Likes likes = new Likes(1, member, findBoard);
            findBoard.addLike(likes);
            likesRepository.save(likes);
            boardRepository.save(findBoard);
        }
    }

    @Transactional(readOnly = true)
    public List<Board> findUserBoards(long memberId) {
        Member member = memberService.findMember(memberId);
        return boardRepository.findByMember(member);
    }


    private Board findExistsBoard(long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }
}
