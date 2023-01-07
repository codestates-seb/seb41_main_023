package com.newyear.mainproject.security.logout;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refreshTokenId;

    private String refreshToken;
    private String accessToken;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime endedAt;

    public RefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
