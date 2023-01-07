package com.newyear.mainproject.security.logout;

import com.newyear.mainproject.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
@Slf4j
public class LogoutController{
    private final JwtTokenizer jwtTokenizer;
    private final RedisUtil redisUtil;

    private final RefreshTokenRepository refreshTokenRepository;

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestBody LogoutDto logoutDto){

        String accessToken = logoutDto.getAccessToken().replace("Bearer ", "");
        String refreshToken = logoutDto.getRefreshToken();
//        String key = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        RefreshToken findRefreshToken = refreshTokenRepository.findByRefreshToken(refreshToken);
        redisUtil.setBlackList(accessToken, "access_token", jwtTokenizer.getBlacklistTime(findRefreshToken.getEndedAt()));

        refreshTokenRepository.delete(findRefreshToken);

        return new ResponseEntity<>(HttpStatus.OK);

    }
}
