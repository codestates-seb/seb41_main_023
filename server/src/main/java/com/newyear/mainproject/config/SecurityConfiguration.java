package com.newyear.mainproject.config;

import com.newyear.mainproject.member.repository.MemberRepository;
import com.newyear.mainproject.security.filter.JwtAuthenticationFilter;
import com.newyear.mainproject.security.filter.JwtVerificationFilter;
import com.newyear.mainproject.security.handler.*;
import com.newyear.mainproject.security.jwt.JwtTokenizer;
import com.newyear.mainproject.security.logout.RedisUtil;
import com.newyear.mainproject.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsUtils;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;
    private final RedisUtil redisUtil;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable() // 로그인 관련 페이지 설정. disable시 작동하지 않음
                .httpBasic().disable() // Http basic Auth  기반으로 로그인 인증창이 뜸.  disable 시에 인증창 뜨지 않음.
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .and()
                .exceptionHandling()
                //.accessDeniedPage("/auths/access-denied")
                // ↑↑↑↑ Security Config에 접근 거부가 생긴 경우 전환할 url을 설정
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                                .antMatchers(HttpMethod.POST, "/members/signup", "/members/login", "/login/**", "/email/**", "/token/reissue").permitAll()
                                .antMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER")
                                .antMatchers(HttpMethod.POST, "/members/logout").permitAll()
                                .antMatchers(HttpMethod.GET, "/members", "/board/user/plan/**").hasAnyRole("ADMIN", "USER")
                                .antMatchers(HttpMethod.GET, "/", "/members/**", "/city", "/board", "/board/**", "/comments/**").permitAll() //추후 추가하기
                                .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER")
                                .antMatchers("/h2/**").permitAll() // h2 콘솔 사용을 위한 설정
                                .antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll()
                                .antMatchers("/login/**", "/oauth2/**", "/loading/**").permitAll()
                        .anyRequest()
//                                .permitAll()
                        .authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, memberRepository, redisUtil))
                );

        return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    //JwtAuthenticationFilter를 등록하는 역할
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception{

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            //wtAuthenticationFilter를 생성하면서 JwtAuthenticationFilter에서 사용되는 AuthenticationManager와 JwtTokenizer를 DI해줌
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, redisUtil);
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login/**");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils, redisUtil);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
