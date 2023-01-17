package com.newyear.mainproject.member;

import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.member.mapper.MemberMapper;
import com.newyear.mainproject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class LoginController {

    private final MemberMapper mapper;
    private final MemberService memberService;

    @GetMapping("/login")
    public ResponseEntity getToken(@RequestParam String accessToken,
                                   @RequestParam String refreshToken,
                                   @RequestParam long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }
}
