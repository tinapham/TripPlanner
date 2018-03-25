package com.mgmtp.screens.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mgmtp.screens.entity.ScreenEntity;

public interface ScreenDAO extends JpaRepository<ScreenEntity, Integer> {

}
