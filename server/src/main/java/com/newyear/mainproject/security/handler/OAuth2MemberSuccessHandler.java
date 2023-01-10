package com.newyear.mainproject.security.handler;

import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.member.repository.MemberRepository;
import com.newyear.mainproject.security.jwt.JwtTokenizer;
import com.newyear.mainproject.security.logout.RefreshToken;
import com.newyear.mainproject.security.logout.RefreshTokenRepository;
import com.newyear.mainproject.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        var oAuth2User = (OAuth2User)authentication.getPrincipal();

        String email = String.valueOf(oAuth2User.getAttributes().get("email")); //  Authentication 객체로부터 얻어낸 OAuth2User 객체로부터 Resource Owner의 이메일 주소를 얻음
        String name = String.valueOf(oAuth2User.getAttributes().get("name"));
        System.out.println(email);

//        List<String> authorities = authorityUtils.createRoles(email); // CustomAuthorityUtils를 이용해 권한 정보를 생성
//        사실 오류가 나서 없애고 직접 유저권한으로 주입하였지만 OAuth로 로그인 하는데 다른 권한을 줄 필요가 있나??

        try {
            Member findMember = memberRepository.findByEmail(email).get();
            redirect(request, response, findMember.getEmail());
        }
        catch (NoSuchElementException e){
            saveMember(email, name); //db에 저장
            redirect(request, response, email);
        }

//        Member findMember = memberRepository.findByEmail(email).get();
//        if(findMember.getEmail() == email){
//            System.out.println(email);
//            redirect(request, response, findMember.getEmail());
//        }
//        else {
//            saveMember(email, name);
//            redirect(request, response, email);
//        }; // DB에 저장


//        redirect(request, response, findMember.getEmail());  // Access Token과 Refresh Token을 생성해서 Frontend 애플리케이션에게 전달하기 위해 Redirect
    }

    private void saveMember(String email, String name) {

        Member member = new Member();
        member.setEmail(email);
        member.setDisplayName(name);
        memberRepository.save(member);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String username) throws IOException {

        String accessToken = delegateAccessToken(username, List.of("USER"));
        String refreshToken = delegateRefreshToken(username);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
        //Frontend 애플리케이션 쪽의 URL을 생성합니다. createURI() 메서드에서
        //UriComponentsBuilder를 이용해 Access Token과 Refresh Token을 포함한 URL을 생성
        //UriComponentsBuilder에서 Port 설정을 하지 않으면 기본값은 80 포트
        String uri = createURI(accessToken, refreshToken).toString();

        //SimpleUrlAuthenticationSuccessHandler에서 제공하는 sendRedirect() 메서드를 이용해
        //Frontend 애플리케이션 쪽으로 리다이렉트
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

    private URI createURI(String accessToken, String refreshToken) {
//        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
//        queryParams.add("access_token", accessToken);
//        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(8080)
//                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
