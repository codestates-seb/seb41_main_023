package com.newyear.mainproject.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

public class CommentDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        @NotBlank
        private String comment;
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private long commentId;
        @NotBlank
        private String comment;
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long commentId;
        private String comment;
        private String createdAt;
        private String displayName;
        private String profileImage;
        private long memberId;
        private String modifiedAt;
    }

    @Getter @Setter
    @NoArgsConstructor
    public static class simpleResponse {
        private long commentId;
        private String createdAt;
        private String modifiedAt;
        private long memberId;
    }

}
