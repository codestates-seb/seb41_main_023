package com.newyear.mainproject.exception;

import lombok.Getter;

public enum ExceptionCode {

    //common
    UNAUTHORIZED(401, "Unauthorized"),
    ACCESS_FORBIDDEN(403, "Access forbidden"),
    METHOD_NOT_ALLOWED(405, "Method Not Allowed"),
    INTERNAL_SERVER_ERROR(500, "Internal Server Error"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_VALUES(400, "Invalid Values"),
    INVALID_EMAIL_AUTH_NUMBER(400, "Invalid email authNumber"),
    INVALID_EMAIL_AUTH(400, "Invalid email auth"),
    INVALID_REFRESH_TOKEN(400, "Invalid refresh token"),
    EXPIRED_JWT_TOKEN(421, "Expired jwt token"),
    EMAIL_AUTH_REQUIRED(403, "Email auth required"),

    //board
    BOARD_NOT_PATCHED(403, "Board not patched"),
    BOARD_NOT_FOUND(404, "Board Not Found"),
    BOARD_CHECK_EXISTS(409, "Board Check exists"),
    BOARD_EXISTS(409, "Board exists"),

    //comment
    COMMENT_NOT_PATCHED(403, "Comment not patched"),
    COMMENT_NOT_FOUND(404, "Comment Not Found"),
    COMMENT_CHECK_EXISTS(409, "Comment Check exists"),

    //expense
    EXPENSE_NOT_PATCHED(403, "Expense not patched"),
    EXPENSE_NOT_FOUND(404, "Expense Not Found"),
    EXPENSE_CHECK_EXISTS(409, "Expense Check exists"),

    //budget
    BUDGET_NOT_PATCHED(403, "Budget not patched"),
    BUDGET_NOT_FOUND(404, "Budget Not Found"),
    BUDGET_CHECK_EXISTS(409, "Budget Check exists"),

    //place
    PLACE_NOT_PATCHED(403, "Place not patched"),
    PLACE_NOT_FOUND(404, "Place Not Found"),
    PLACE_CHECK_EXISTS(409, "Place Check exists"),
    PLACE_EXPENSE_EXISTS(409, "Place Expense exists"),

    //plan
    PLAN_NOT_PATCHED(403, "Plan not patched"),
    PLAN_NOT_FOUND(404, "Plan Not Found"),
    PLAN_DATE_NOT_FOUND(404, "Plan Date Not Found"),
    PLAN_CHECK_EXISTS(409, "Plan Check exists"),

    //city
    CITY_NOT_PATCHED(403, "City not patched"),
    CITY_NOT_FOUND(404, "City Not Found"),
    CITY_CHECK_EXISTS(409, "City Check exists"),

    //member
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    MAX_FILE_SIZE_2MB(400, "Max file size 2MB"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    INVALID_PASSWORD (400, "Invalid Password"),
    MEMBER_NOT_LOGIN(400, "Member not login");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
