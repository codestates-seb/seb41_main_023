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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
@Slf4j
public class LogoutController{
    private final JwtTokenizer jwtTokenizer;
    private final RedisUtil redisUtil;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberService memberService;

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestBody @Valid LogoutDto logoutDto){
        Member member = memberService.getLoginMember();

        String accessToken = logoutDto.getAccessToken().replace("Bearer ", "");
        String refreshToken = logoutDto.getRefreshToken();
//        String key = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        RefreshToken findRefreshToken = refreshTokenRepository.findByRefreshToken(refreshToken);

        try{
            redisUtil.setBlackList(accessToken, "access_token", jwtTokenizer.getBlacklistTime(findRefreshToken.getEndedAt()));
        }
        catch (NullPointerException e){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_LOGIN);
        }

        refreshTokenRepository.delete(findRefreshToken);

        //refresh token 삭제
        //TODO : 테스트해보기
        if (redisUtil.hasKey(member.getEmail())) {
            redisUtil.delete(member.getEmail());
        }

        return new ResponseEntity<>(HttpStatus.OK);

    }
}
