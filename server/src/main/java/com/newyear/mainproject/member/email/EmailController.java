package com.newyear.mainproject.member.email;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/email/auth")
    public ResponseEntity mailConfirm(@RequestBody EmailDto emailDto) throws MessagingException {
        emailService.sendEmail(emailDto.getEmail());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
