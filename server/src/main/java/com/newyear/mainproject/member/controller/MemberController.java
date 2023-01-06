package com.newyear.mainproject.member.controller;

import com.newyear.mainproject.dto.MultiResponseDto;
import com.newyear.mainproject.dto.SingleResponseDto;
import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.member.dto.MemberDto;
import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.member.mapper.MemberMapper;
import com.newyear.mainproject.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/members")
@Validated
public class MemberController {

    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberMapper mapper;
    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

    public MemberController(MemberMapper mapper, MemberService memberService, PasswordEncoder passwordEncoder) {
        this.mapper = mapper;
        this.memberService = memberService;
        this.passwordEncoder = passwordEncoder;
    }


    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post post){
        Member member = mapper.memberPostToMember(post);
        Member createMember = memberService.createMember(member);

        MemberDto.Response response = mapper.memberToMemberResponseDto(createMember);

        return new ResponseEntity<> (new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.Patch patch){
        patch.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchToMember(patch));
        MemberDto.Response response = mapper.memberToMemberResponseDto(member);

        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @PatchMapping("/password/{member-id}")
    public ResponseEntity patchPasswordMember(@PathVariable("member-id") @Positive long memberId,
                                              @Valid @RequestBody MemberDto.PatchPassword patch){
        patch.setMemberId(memberId);

        //matchs를 이용하여 받은 비밀번호와 원래비밀번호를 복호화후 비교해 true or false 반환
        if(passwordEncoder.matches(patch.getOriginPassword(), memberService.findVerifiedMember(memberId).getPassword())){
            memberService.updatePasswordMember(mapper.memberPatchPasswordToMember(patch));
        }
        else throw new BusinessLogicException(ExceptionCode.INVALID_PASSWORD);

        return new ResponseEntity(HttpStatus.CREATED); // 나중에 response 바꾸거나 안나오게 변경
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId){
        Member member = memberService.findMember(memberId);

        return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size){
        Page<Member> pageMembers = memberService.findMembers(page-1,size);
        List<Member> members = pageMembers.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.membersToResponseDto(members), pageMembers), HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId){
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
