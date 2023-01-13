package com.newyear.mainproject.member.service;

import com.newyear.mainproject.board.repository.BoardRepository;
import com.newyear.mainproject.comment.repository.CommentRepository;
import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.member.repository.MemberRepository;
import com.newyear.mainproject.plan.service.PlanService;
import com.newyear.mainproject.security.utils.CustomAuthorityUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final S3Service s3Service;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils, BoardRepository boardRepository,
                         CommentRepository commentRepository, S3Service s3Service,
                         @Lazy PlanService planService) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.boardRepository = boardRepository;
        this.commentRepository = commentRepository;
        this.s3Service = s3Service;
        this.planService = planService;
    }

    private final PlanService planService;

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        //패스워드 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        // 기본 프로필 이미지 설정
        if (member.getProfileImage() == null) {
            member.setProfileImage("https://seb41pre020.s3.ap-northeast-2.amazonaws.com/basic.png");
            member.setProfileKey("basic.png");
        }

        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getDisplayName())
                .ifPresent(name -> findMember.setDisplayName(name));

        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(memberStatus -> findMember.setMemberStatus(memberStatus));

        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(
                        passwordEncoder.encode(password)
                ));

        return memberRepository.save(findMember);
    }

    public Member updatePasswordMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(
                        passwordEncoder.encode(password)
                ));

        return memberRepository.save(findMember);
    }

    public Member updateDisplayName(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getDisplayName())
                .ifPresent(name -> findMember.setDisplayName(name));

        return memberRepository.save(findMember);
    }

    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public Member findMemberProfile(Member member){
        Member findMember = findVerifiedMember(member.getMemberId());
        return findMember;
    }


    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("memberId").descending()));
    }

    public void deleteMember(long memberId) {
        Member member = findVerifiedMember(memberId);
        member.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);
        memberRepository.save(member);

        //회원 탈퇴시 board, comment 삭제
        boardRepository.deleteAll(member.getBoards());
        commentRepository.deleteAll(member.getComments());
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member member = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        if (member.getMemberStatus() == Member.MemberStatus.MEMBER_QUIT
                || member.getMemberStatus() == Member.MemberStatus.MEMBER_SLEEP) {
            throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_STATUS);
        }

        return member;
    }

    private String findLoginMemberEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    // 로그인 유저 얻기
    public Member getLoginMember() {
        Optional<Member> optionalMember = memberRepository.findByEmail(findLoginMemberEmail());
        Member member = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return member;
    }

    // 회원 프로필 이미지 업로드
    public Member editProfileImage(MultipartFile multipartFile, long memberId) throws IOException {
        Member member = findMember(memberId);
        //이미지 없을 경우 예외 처리
        if(multipartFile.isEmpty()) throw new BusinessLogicException(ExceptionCode.INVALID_VALUES);
        //자신의 프로필 이미지만 수정 가능
        if (member.getMemberId() != getLoginMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }
        Map<String, String> profile = s3Service.uploadFile(member.getProfileKey(), multipartFile);
        member.setProfileImage(profile.get("url"));
        member.setProfileKey(profile.get("key"));

        return memberRepository.save(member);
    }
}
