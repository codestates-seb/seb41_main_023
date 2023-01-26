package com.newyear.mainproject.member.email;

import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.security.logout.RedisUtil;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
@Getter
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    private final RedisUtil redisUtil;
    private String authNum;

    //랜덤 인증 번호
    public void createAuthCode() {
        Random random = new Random();
        String key = "";

        for (int i = 0; i < 3; i++) {
            int index = random.nextInt(25) + 65;
            key += (char) index;
        }

        int numIndex = random.nextInt(9999) + 1000;
        key += numIndex;

        authNum = key;
    }

    //form
    public MimeMessage createJoinEmailForm(String email) throws MessagingException {

        createAuthCode();
        String setFrom = "newyearteam23@gmail.com";
        String title = "[뉴이어] 이메일 인증 번호";

        MimeMessage message = javaMailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email);
        message.setSubject(title);
        message.setFrom(setFrom);
        message.setText(setContext(authNum), "utf-8", "html");

        return message;
    }

    //context
    public String setContext(String code) {
        Context context = new Context();
        context.setVariable("code", code);
        return templateEngine.process("email", context);
    }

    //send
    public String sendEmail(String toEmail) throws MessagingException {
        MimeMessage emailForm = createJoinEmailForm(toEmail);
        javaMailSender.send(emailForm);
        redisUtil.set(toEmail + "_auth", authNum, 3);
        return authNum;
    }

    public void confirmEmail(String authNum, String email) {
        //이메일 인증 (인증 번호)
        try {
            if (!redisUtil.get(email + "_auth").equals(authNum)) {
                throw new BusinessLogicException(ExceptionCode.INVALID_EMAIL_AUTH_NUMBER);
            }
        } catch (NullPointerException e) { //인증번호 발송되지 않은 이메일인 경우 예외처리
            throw new BusinessLogicException(ExceptionCode.INVALID_EMAIL_AUTH);
        }
    }
}
