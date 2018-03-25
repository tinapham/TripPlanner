package com.mgmtp.screens.repository;

import com.mgmtp.screens.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface UserDAO extends JpaRepository<UserEntity, Integer> {

    UserEntity getUserEntityByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    UserEntity getUserEntityByEmail(@Param("email") String email);
}
