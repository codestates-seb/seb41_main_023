package com.newyear.mainproject.security.filter;

import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.security.jwt.JwtTokenizer;
import com.newyear.mainproject.security.logout.RedisUtil;
import com.newyear.mainproject.security.logout.RefreshTokenRepository;
import com.newyear.mainproject.security.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter{
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final RedisUtil redisUtil;
    private final RefreshTokenRepository refreshTokenRepository;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils,
                                 RedisUtil redisUtil, RefreshTokenRepository refreshTokenRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.redisUtil = redisUtil;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);

            if(redisUtil.hasKeyBlackList(request.getHeader("Authorization").replace("Bearer ", ""))){
                throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_STATUS);
            }

//            TODO★★★★★★★★★★★★★★★★★★★★★재발급 부분 임시로 저장 재발급 넣어야 할부분에 넣으면 될듯★★★★★★★★★★★★★★★★★★

//            if(redisUtil.hasKeyBlackList(request.getHeader("Authorization").replace("Bearer ", ""))){
//                throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_STATUS);
//            }
//            else if(refreshTokenRepository.findByRefreshToken(request.getHeader("Refresh")) != null) {
//                //블랙리스트에 저장되어있지 않고 리프레쉬 토큰이 레파지토리에 존재함으로 엑세스토큰 재발급해야함
//                RefreshToken refreshToken = refreshTokenRepository.findByRefreshToken(request.getHeader("Refresh"));
//            }

//            TODO★★★★★★★★★★★★★★★★★★★★★재발급 부분 임시로 저장 재발급 넣어야 할부분에 넣으면 될듯★★★★★★★★★★★★★★★★★★

            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}