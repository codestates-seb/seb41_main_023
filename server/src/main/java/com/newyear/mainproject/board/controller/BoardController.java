package com.newyear.mainproject.board.controller;

import com.newyear.mainproject.board.dto.BoardDto;
import com.newyear.mainproject.board.entity.Board;
import com.newyear.mainproject.board.mapper.BoardMapper;
import com.newyear.mainproject.board.service.BoardService;
import com.newyear.mainproject.dto.MultiResponseDto;
import com.newyear.mainproject.plan.entity.Plan;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/board")
@Validated
@RequiredArgsConstructor
public class BoardController {

    private final BoardMapper mapper;
    private final BoardService boardService;

    @PostMapping("/plan/{plan-id}")
    public ResponseEntity postBoard(@RequestBody @Valid BoardDto.Post post,
                                    @PathVariable("plan-id") @Positive long planId) {
        Board board = boardService.createBoard(mapper.postDtoToBoard(post), planId);
        return new ResponseEntity<>(mapper.boardToSimpleResponse(board), HttpStatus.CREATED);
    }

    @PatchMapping("/{board-id}")
    public ResponseEntity patchBoard(@PathVariable("board-id") long boardId,
                                     @RequestBody @Valid BoardDto.Patch patch) {
        patch.setBoardId(boardId);
        Board board = boardService.updateBoard(mapper.patchDtoToBoard(patch));
        return new ResponseEntity<>(mapper.boardToSimpleResponse(board), HttpStatus.OK);
    }

    //한 게시물 조회
    @GetMapping("{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") @Positive long boardId,
                                   HttpServletRequest request,
                                   HttpServletResponse response) {
        Board board = boardService.findBoard(boardId);

        //조회수 로직 - 쿠키를 이용한 조회수 중복 방지
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (!cookie.getValue().contains(String.valueOf(boardId))) {
                    cookie.setValue(cookie.getValue() + "_" + boardId);
                    cookie.setMaxAge(60 * 60 * 2);
                    response.addCookie(cookie);
                    boardService.viewCount(board);
                }
            }
        } else {
            Cookie newCookie = new Cookie("visit_cookie", String.valueOf(boardId));
            newCookie.setMaxAge(60 * 60 * 2);
            response.addCookie(newCookie);
            boardService.viewCount(board);
        }
        return new ResponseEntity<>(mapper.boardToResponseDetailsDto(board), HttpStatus.OK);
    }

    //plan 불러온 뒤 board 작성시 화면
    @GetMapping("/user/plan/{plan-id}")
    public ResponseEntity getBoard(@PathVariable("plan-id") @Positive long planId) {
        Plan plan = boardService.findPlan(planId);
        return new ResponseEntity<>(mapper.boardToResponseEditDto(plan), HttpStatus.OK);
    }

    // 목록 조회 화면 (tab 미입력시 - 좋아요 순 & tab 옵션 - 좋아요(likes)/최신(boardId)/뷰(views))
    // ver.1 : 페이지 네이션
    @GetMapping
    public ResponseEntity getBoards(@RequestParam @Positive int page,
                                    @RequestParam @Positive int size,
                                    @RequestParam(required = false) String tab,
                                    @RequestParam(required = false) String city) {
        if (tab == null) tab = "likes";
        Page<Board> pages = boardService.findOptionalBoards(page-1, size, tab, city);
        List<Board> boards = pages.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.boardsToBoardResponseDto(boards), pages), HttpStatus.OK);
    }

    // 목록 조회 화면
    // ver.2 : 무한스크롤을 위한 전체 조회
    @GetMapping("/all")
    public ResponseEntity getAllBoards(@RequestParam(required = false) String tab) {
        if (tab == null) tab = "likes";
        List<Board> boards = boardService.findBoards(tab);
        return new ResponseEntity<>(mapper.boardsToBoardResponseDto(boards), HttpStatus.OK);
    }

    // 도시 이름으로 조회
//    @GetMapping("/plan")
//    public ResponseEntity getBoardForCity(@RequestParam @NotBlank String city,
//                                          @RequestParam(required = false) String tab,
//                                          @RequestParam @Positive int page,
//                                          @RequestParam @Positive int size) {
//        if (tab == null) tab = "likes";
//        Page<Board> pages = boardService.findCityBoards(page-1, size, city, tab);
//        List<Board> boards = pages.getContent();
//        return new ResponseEntity<>(new MultiResponseDto<>(mapper.boardsToBoardResponseDto(boards), pages), HttpStatus.OK);
//    }

    // 좋아요 클릭
    @PostMapping("{board-id}/likes")
    public ResponseEntity postLikes(@PathVariable("board-id") @Positive long boardId) {
        boardService.clickLikes(boardId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 게시물 삭제
    @DeleteMapping("{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id") @Positive long boardId) {
        boardService.deleteBoard(boardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 특정 회원의 게시물 조회 (유저 프로필 클릭시)
    @GetMapping("/user/{member-id}")
    public ResponseEntity getUserBoards(@PathVariable("member-id") @Positive long memberId) {
        List<Board> userBoards = boardService.findUserBoards(memberId);
        return new ResponseEntity<>(mapper.boardsToBoardResponseDto(userBoards), HttpStatus.OK);
    }

}
