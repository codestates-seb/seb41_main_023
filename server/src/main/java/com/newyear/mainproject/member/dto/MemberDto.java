package com.newyear.mainproject.member.dto;

import com.newyear.mainproject.member.entity.Member;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post{

        @NotBlank
        @Email
        private String email;

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        @Pattern(regexp="[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{1,20}")
        private String displayName;

        @NotBlank
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&]).{8,20}")
        private String password;

    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch{
        private long memberId;
        private String password;
        private String displayName;
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PatchPassword{
        private long memberId;

        @NotBlank
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&]).{8,20}")
        private String password;

        private String originPassword;
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PatchDisplayName{
        private long memberId;

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        @Pattern(regexp="[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{1,20}")
        private String displayName;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Delete{
        @NotBlank
        private String accessToken;
        @NotBlank
        private String refreshToken;
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class userProfile{
        private long memberId;
        private String email;
        private String displayName;
        //프로필이미지
        private String profileImage;
        private long cities;
        private long trips;
        private String createdAt;
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long memberId;
        private String email;
        private String displayName;
        private String profileImage;
        private String createdAt;
        private Member.MemberStatus memberStatus;
        public String getMemberStatus() {
            return memberStatus.getStatus();
        }
    }
}
