package com.newyear.mainproject.security.logout;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long>{
    RefreshToken findByRefreshToken(String refreshToken);
}
