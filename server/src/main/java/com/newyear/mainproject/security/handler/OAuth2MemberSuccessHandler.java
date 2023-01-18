package com.newyear.mainproject.security.handler;

import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.member.repository.MemberRepository;
import com.newyear.mainproject.security.jwt.JwtTokenizer;
import com.newyear.mainproject.security.logout.RefreshToken;
import com.newyear.mainproject.security.logout.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        String email;
        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        Map<String,Object> naver = (Map<String, Object>) attributes.get("response");
        Map<String,Object> kakao = (Map<String, Object>) attributes.get("kakao_account");

        if (kakao != null) {
            email = kakao.get("email").toString();
        } else if (naver != null) {
            email = naver.get("email").toString();
        } else if (attributes.get("email") == null) {
            email = attributes.get("name") + "@github.com";
        } else {
            email = attributes.get("email").toString();
        }

        log.info("member's email : {}", email);

        redirect(request, response, email);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String username) throws IOException {

        String accessToken = delegateAccessToken(username, List.of("USER"));
        String refreshToken = delegateRefreshToken(username);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        Member member = memberRepository.findByEmail(username).get();
        String uri = createURI("Bearer " + accessToken, refreshToken, member.getMemberId()).toString();

        getRedirectStrategy().sendRedirect(request, response, uri);

    }

    private String delegateAccessToken(String username, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", authorities);

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        System.out.println("엑세스토큰 생성됨★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★");

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        RefreshToken token = new RefreshToken(refreshToken);
        token.setEndedAt(LocalDateTime.now());
        token.setEndedAt(token.getEndedAt().plusMinutes(jwtTokenizer.getAccessTokenExpirationMinutes()));

        System.out.println("리프레쉬토큰 생성됨★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★");

        refreshTokenRepository.save(token);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken, long memberId) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("accessToken", accessToken);
        queryParams.add("refreshToken", refreshToken);
        queryParams.add("memberId", String.valueOf(memberId));

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("travel-logs.s3-website.ap-northeast-2.amazonaws.com")//S3주소로
//                .host("localhost")
//                .port(8080)
                .path("/login")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
