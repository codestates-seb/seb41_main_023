package com.newyear.mainproject.member.mapper;

import com.newyear.mainproject.member.dto.MemberDto;
import com.newyear.mainproject.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post post);

    Member memberPatchToMember(MemberDto.Patch patch);

    Member memberPatchPasswordToMember(MemberDto.PatchPassword patchPassword);

    List<MemberDto.Response> membersToResponseDto(List<Member> members);

//    MemberDto.Response memberToMemberResponseDto(Member member);

    default MemberDto.Response memberToMemberResponseDto(Member member){
        MemberDto.Response response = new MemberDto.Response();
        response.setMemberId(member.getMemberId());
        response.setDisplayName(member.getDisplayName());
        response.setMemberStatus(member.getMemberStatus());
        response.setEmail(member.getEmail());

        return response;
    }
}
