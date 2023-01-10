package com.newyear.mainproject.member.dto;

import com.newyear.mainproject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post{

        @NotBlank
        @Email
        private String email;

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String displayName;

        @NotBlank
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
        private String password;
        private String originPassword;
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PatchDisplayName{
        private long memberId;
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
        private String email;
        private String displayName;
        //프로필이미지
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private long memberId;
        private String email;
        private String displayName;
        //        private String profileImage;
        private Member.MemberStatus memberStatus;
        public String getMemberStatus() {
            return memberStatus.getStatus();
        }
    }
}
