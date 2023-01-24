package com.newyear.mainproject.member.email;

import com.newyear.mainproject.security.logout.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;
    private final RedisUtil redisUtils;
    //인증 번호 발송
    @PostMapping("/email/auth")
    public ResponseEntity mailConfirm(@RequestBody @Valid EmailDto emailDto) throws MessagingException {
        emailService.sendEmail(emailDto.getEmail());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //인증 번호 확인
    @PostMapping("/email/confirm")
    public ResponseEntity emailAuthNumConfirm(@RequestParam @NotBlank String authNum,
                                              @RequestBody @Valid EmailDto emailDto) {
        emailService.confirmEmail(authNum, emailDto.getEmail());
        redisUtils.set(emailDto.getEmail() + "_confirm", authNum, 60);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
