package com.newyear.mainproject.security.handler;

import com.google.gson.Gson;
import com.newyear.mainproject.exception.ErrorResponse;
import com.newyear.mainproject.exception.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        // 인증 실패 시, 에러 로그를 기록하거나 error response를 전송할 수 있다.
        log.error("# Authentication failed: {}", exception.getMessage());

        sendErrorResponse(response, exception);
    }

    private void sendErrorResponse(HttpServletResponse response, AuthenticationException exception) throws IOException {
        ExceptionCode exceptionCode = ExceptionCode.UNAUTHORIZED;

        if(exception.getMessage() == "Member not found"){
            exceptionCode = ExceptionCode.UNAUTHORIZED; //프론트쪽에서 401로 해서 맞춰주기
        }
        if(exception.getMessage() == "Invalid member status"){
            exceptionCode = ExceptionCode.INVALID_MEMBER_STATUS;
        }

        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(exceptionCode);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(exceptionCode.getStatus());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
