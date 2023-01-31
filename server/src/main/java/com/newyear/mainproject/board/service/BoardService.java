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
import com.newyear.mainproject.security.logout.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberService memberService;
    private final LikesRepository likesRepository;
    private final PlanService planService;
    private final RedisUtil redisUtil;

    public Board createBoard(Board board, long planId) {
        Member member = memberService.getLoginMember();
        Plan plan = planService.findPlan(planId);

        //해당 plan 작성자만 board 생성 가능
        if (!plan.getMember().equals(member)) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }

        //만약 해당 일정에 게시판이 작성되어 있다면 예외
        if (!boardRepository.findAllByPlan(plan).isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.BOARD_EXISTS);
        }

        //이 일정에 대한 게시물 등록하면 true 값으로 수정
        plan.setBoardCheck(true);
        planService.updatePlan(plan);

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

        Plan plan = planService.findPlan(findBoard.getPlan().getPlanId());

        //이 일정에 대한 게시물 삭제하면 false 값으로 수정
        plan.setBoardCheck(false);
        planService.updatePlan(plan);

        boardRepository.delete(findBoard);
    }

    public Board findBoard(long boardId) {
        return findExistsBoard(boardId);
    }

    public Board findOneBoard(long boardId) {
        Board findBoard = findExistsBoard(boardId);

        isFirstRequest(boardId, findBoard);

        return findBoard;
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

    /*
     tab=boardId : 최신순
     tab=likes : 좋아요순
     tab=views : 조회수순
     */
    public Page<Board> findOptionalBoards(int page, int size, String tab, String city) {
        List<Board> boards = getOptionBoards(tab);

        if (city != null) {
            boards = boards.stream().filter(board -> board.getPlan().getCityName().equals(city)).collect(Collectors.toList());
        }

        Pageable pageable = PageRequest.of(page, size);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), boards.size());

        return new PageImpl<>(boards.subList(start, end), pageable , boards.size());
    }

    public List<Board> findBoards(String tab) {
        return getOptionBoards(tab);
    }

    private List<Board> getOptionBoards(String tab) {
        List<Board> boards;
        if (tab.equals("likes")) {
            boards = boardRepository.findAll();
            boards.sort(Collections.reverseOrder(Comparator.comparing(b -> b.getLikes().size())));
        } else {
            boards = boardRepository.findAll(Sort.by(tab).descending());
        }
        return boards;
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
            Likes likes = new Likes(member, findBoard);
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

    public List<Board> findPlanBoards(Long planId) {
        Plan findPlan = planService.findPlan(planId);
        return boardRepository.findAllByPlan(findPlan);
    }

    private Board findExistsBoard(long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }


    /*
    * 게시판
    * 조회수
    * */
    private void viewCount(Board board) {
        board.setViews(board.getViews() + 1);
        boardRepository.save(board);
    }

    //방문한 게시판은 1시간 후에 조회수 증가 허용
    private void isFirstRequest(long boardId, Board board) {
        String key;
        String add = "_" + boardId + "_";

        try {
            key = memberService.getLoginMember().getMemberId() + "_visit"; //회원인 경우 key 값
        } catch (BusinessLogicException e) {
            if (getIp() == null) return;
            key = getIp() + "_visit"; //비회원인 경우 key 값
        }

        if (redisUtil.hasKey(key)) {
            String value = redisUtil.get(key).toString();
            if (!value.contains(add)) {
                log.info("조회수 증가 : {}", "key : " + key + "value : " + value);
                viewCount(board);
                redisUtil.set(key, value + boardId + "_", 60); //처음 방문하는 게시판
            }
        } else {
            viewCount(board);
            redisUtil.set(key, add, 60); //초기 세팅
            log.info("조회수 증가 : {}", "key : " + key);
        }
    }

    //비회원인 경우 ip 주소로 식별
    private String getIp() {

        InetAddress ip = null;

        try {
            ip = InetAddress.getLocalHost();
        } catch (UnknownHostException e) {
            log.info(e.getMessage());
        }
        return String.valueOf(ip);
    }
}
