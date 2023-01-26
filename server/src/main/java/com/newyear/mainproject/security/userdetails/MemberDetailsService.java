package com.newyear.mainproject.security.userdetails;

import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.member.repository.MemberRepository;
import com.newyear.mainproject.security.utils.CustomAuthorityUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
public class MemberDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    public MemberDetailsService(MemberRepository memberRepository, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        //회원 상태가 ACTIVE 가 아니면 예외처리
        Member member = memberRepository.findByEmail(username).get();
        if(member.getMemberStatus() != Member.MemberStatus.MEMBER_ACTIVE){
            throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_STATUS);
        }

        return new MemberDetails(findMember);
    }

    private final class MemberDetails extends Member implements UserDetails{
        MemberDetails(Member member){
            setMemberId(member.getMemberId());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities(){
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername(){
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired(){
            return true;
        }

        @Override
        public boolean isAccountNonLocked(){
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired(){
            return true;
        }

        @Override
        public boolean isEnabled(){
            return true;
        }
    }
}