package com.newyear.mainproject.member.mapper;

import com.newyear.mainproject.member.dto.MemberDto;
import com.newyear.mainproject.member.entity.Member;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post post);

    Member memberPatchToMember(MemberDto.Patch patch);

    Member memberPatchPasswordToMember(MemberDto.PatchPassword patchPassword);

    Member memberPatchDisplayNameToMember(MemberDto.PatchDisplayName patchDisplayName);

    List<MemberDto.Response> membersToResponseDto(List<Member> members);

//    MemberDto.Response memberToMemberResponseDto(Member member);

    default MemberDto.userProfile memberToUserProfileDto(Member member, long trips, long cities){
        MemberDto.userProfile response = new MemberDto.userProfile();
        response.setMemberId(member.getMemberId());
        response.setEmail(member.getEmail());
        response.setDisplayName(member.getDisplayName());
        //이미지 추가
        response.setProfileImage(member.getProfileImage());
        response.setTrips(trips);
        response.setCities(cities);

        LocalDateTime dateTime = member.getCreatedAt();
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
        response.setCreatedAt(createdAt);

        return response;

    }

    default MemberDto.Response memberToMemberResponseDto(Member member){
        MemberDto.Response response = new MemberDto.Response();
        response.setMemberId(member.getMemberId());
        response.setDisplayName(member.getDisplayName());
        response.setMemberStatus(member.getMemberStatus());
        response.setEmail(member.getEmail());
        response.setProfileImage(member.getProfileImage());

        LocalDateTime dateTime = member.getCreatedAt();
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
        response.setCreatedAt(createdAt);

        return response;
    }
}
