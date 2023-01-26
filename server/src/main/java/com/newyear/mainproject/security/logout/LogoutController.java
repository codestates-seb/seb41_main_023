package com.newyear.mainproject.security.logout;

import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.member.service.MemberService;
import com.newyear.mainproject.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotBlank;


@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
@Slf4j
public class LogoutController{
    private final JwtTokenizer jwtTokenizer;
    private final RedisUtil redisUtil;
    private final MemberService memberService;

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestHeader("Authorization") @NotBlank String token){
        Member member = memberService.getLoginMember();

        String accessToken = token.replace("Bearer ", "");
//        String key = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String encodeBase64SecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        System.out.println("access 토큰 남은 유효시간 : " + jwtTokenizer.getExpiration(accessToken, encodeBase64SecretKey));

        try{
            redisUtil.setBlackList(accessToken, "access_token", jwtTokenizer.getBlacklistTime(jwtTokenizer.getExpiration(accessToken, encodeBase64SecretKey)));
        }
        catch (NullPointerException e){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_LOGIN);
        }

        //refresh token 삭제
        if (redisUtil.hasKey(member.getEmail())) {
            redisUtil.delete(member.getEmail());
        }

        return new ResponseEntity<>(HttpStatus.OK);

    }
}
