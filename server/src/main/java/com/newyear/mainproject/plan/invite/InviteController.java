package com.newyear.mainproject.plan.invite;

import com.newyear.mainproject.member.repository.MemberRepository;
import com.newyear.mainproject.plan.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/invite")
@RequiredArgsConstructor
public class InviteController {
    private final InviteService inviteService;
    private final PlanService planService;
    private final MemberRepository memberRepository;

    // 랜덤한 값을 만들어내는 API
    //	랜덤한 값이 redis에 존재하면 새로운 값을 만들어내야함
    //	redis에 저장되어야함
    @PostMapping("/link/{plan-id}")
    public ResponseEntity link(@PathVariable("plan-id") @Positive long planId){
        //랜덤한 값을 만들고 redis 에 존재하면 새로운 값을 만들어서 redis 에 저장 ?시간은30분?
        String inviteNum = inviteService.createInviteCode(planId);

        String response = "http://sebmain41team23.shop/invite/o/" + inviteNum;

        return new ResponseEntity(response, HttpStatus.OK);
    }



    // 초대링크가 맞는지 확인하는 API
    //	초대링크가 맞으면 OK를 틀리면 error를 보내줘야함
    @PostMapping("/o/{invite-link}")
    public ResponseEntity check(@PathVariable("invite-link") @Positive String inviteNum,
                                @RequestBody InviteDto inviteDto){
        //	초대링크가 맞으면 OK를 틀리면 error를 보내줘야함
        long planId = inviteService.confirmInviteCode(inviteNum);

        String email = memberRepository.findById(inviteDto.getMemberId()).get().getEmail();

        planService.sharePlan(planId, email); //TODO: 이부분에서 오류가 생기는것 같습니다....



        // 권한이 없으면 error



        return new ResponseEntity(planId, HttpStatus.OK);
    }
}
