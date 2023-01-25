package com.newyear.mainproject.board.mapper;

import com.newyear.mainproject.board.dto.BoardDto;
import com.newyear.mainproject.board.entity.Board;
import com.newyear.mainproject.board.likes.Likes;
import com.newyear.mainproject.city.entity.City;
import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.place.entity.Place;
import com.newyear.mainproject.plan.entity.Plan;
import com.newyear.mainproject.plan.entity.PlanDates;
import org.mapstruct.Mapper;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Mapper(componentModel = "spring")
public interface BoardMapper {

    Board postDtoToBoard(BoardDto.Post post);
    Board patchDtoToBoard(BoardDto.Patch patch);

    BoardDto.SimpleResponse boardToSimpleResponse(Board board);

    //한 게시물 조회
    default BoardDto.ResponseDetails boardToResponseDetailsDto(Board board) {
        LocalDateTime dateTime = board.getCreatedAt();
        String day = String.valueOf(dateTime.getDayOfMonth());

        if (dateTime.getDayOfMonth() < 4 || dateTime.getDayOfMonth() > 20) {
            if (day.endsWith("1")) {
                day = "st";
            } else if (day.endsWith("2")) {
                day = "nd";
            } else if (day.endsWith("3")) {
                day = "rd";
            } else day = "th";
        } else day = "th";

        String createdAt = dateTime.getMonth().toString().substring(0, 3) + " "
                + dateTime.getDayOfMonth() + day +", " + dateTime.getYear();

        //일정과 연결
        Plan plan = board.getPlan();
        List<BoardDto.Days> days = newDays(plan);
        Member member = board.getMember();
        City city = plan.getCity();

        return new BoardDto.ResponseDetails(board.getBoardId(), board.getTitle(), board.getContent(), board.getLikes().size(),
                board.getViews(), createdAt, member.getMemberId(), member.getDisplayName(), member.getProfileImage(), checkLikes(board),
                plan.getPlanId(), city.getCityName(), days, city.getCityImage());
    }

    //게시물 편집 화면
    default BoardDto.ResponseEditDetails boardToResponseEditDto(Plan plan) {

        List<BoardDto.Days> days = newDays(plan);
        City city = plan.getCity();
        return new BoardDto.ResponseEditDetails(plan.getPlanTitle(), plan.getPlanId(), city.getCityName(), days, city.getCityImage());
    }

    //게시물 목록 조회
    default List<BoardDto.Response> boardsToBoardResponseDto(List<Board> boards) {

        List<BoardDto.Response> list = new ArrayList<>( boards.size() );
        for ( Board board : boards ) {

            String start = board.getPlan().getStartDate();
            String end = board.getPlan().getEndDate();
            LocalDate startDate = LocalDate.parse(start, DateTimeFormatter.ISO_DATE);
            LocalDate endDate = LocalDate.parse(end, DateTimeFormatter.ISO_DATE);

            String period = startDate.getMonth().toString().substring(0, 3) + " " + start.substring(8) + " - " +
                    endDate.getMonth().toString().substring(0, 3) + " " + end.substring(8) + ", " + endDate.getYear();

            Member member = board.getMember();

            list.add(new BoardDto.Response(board.getBoardId(), board.getTitle(), board.getLikes().size(),
                board.getViews(), member.getMemberId(), member.getDisplayName(), member.getProfileImage(), checkLikes(board), period, board.getPlan().getCity().getCityImage()));
        }
        return list;
    }

    private boolean checkLikes(Board board) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        boolean checkLikes = false;
        Optional<Likes> likes = board.getLikes().stream().filter(like -> like.getMember().getEmail().equals(email)).findAny();

        if (likes.isPresent()) {
            checkLikes = true;
        }
        return checkLikes;
    }

    private List<BoardDto.Days> newDays(Plan plan) {
        List<PlanDates> planDates = plan.getPlanDates();
        List<BoardDto.Days> days = new ArrayList<>();

        for (int i = 0; i < planDates.size(); i++) {
            BoardDto.Days newDays = new BoardDto.Days();
            newDays.setDay("Day " + (i+1));
            List<BoardDto.PlaceDetails> details = new ArrayList<>();
            int idx = 0;
            for (Place place : planDates.get(i).getPlaces()) {
                idx += 1;
                details.add(new BoardDto.PlaceDetails(idx, place.getPlaceId(), place.getPlaceName(), place.getStartTime(), place.getEndTime(), place.getDescription(),
                        place.getLatitude(), place.getLongitude(), place.getPlaceAddress(), place.getRatings(), place.getWebsite(), place.getPhone(), place.getOpeningHours()));
            }
            newDays.setPlaceDetails(details);
            days.add(newDays);
        }
        return days;
    }

}
