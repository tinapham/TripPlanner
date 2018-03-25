package com.mgmtp.screens.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mgmtp.screens.entity.AppEntity;

public interface AppDAO extends JpaRepository<AppEntity, Integer> {

}
