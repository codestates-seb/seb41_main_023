package com.newyear.mainproject.plan.invite;

import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.security.logout.RedisUtil;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@Getter
@RequiredArgsConstructor
public class InviteService {
    private final RedisUtil redisUtil;

    private String inviteNum;

    //랜덤 인증 번호
    public String createInviteCode(long planId) {
        Random random = new Random();
        String key = "";

        int whileNum = 0;
        while (whileNum < 5){ // while 문을 최대 5번반복

            whileNum++;

            for (int i = 0; i < 3; i++) {
                int index = random.nextInt(25) + 65;
                key += (char) index;
            }

            int numIndex = random.nextInt(9999) + 1000;
            key += numIndex;

            inviteNum = key;

            if(!redisUtil.hasKey(inviteNum)){ //redis 에 랜덤키가 저장되어있지 않으면 while 문을 빠져나감
                break;
            }

        }

        saveInviteCode(inviteNum, planId);

        return inviteNum;
    }

    //레디스 저장
    public void saveInviteCode(String inviteCode, long planId){
        redisUtil.set(inviteCode, planId, 30);
    }

    //인증 번호 확인
    public long confirmInviteCode(String inviteNum) {
        //이메일 인증 (인증 번호)
        if (!redisUtil.hasKey(inviteNum)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_EMAIL_AUTH_NUMBER); //TODO: 추후 수정
        }

        long planId = Long.parseLong(String.valueOf(redisUtil.get(inviteNum)));
        return planId;
    }
}
