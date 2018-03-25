package com.mgmtp.screens.repository;

import com.mgmtp.screens.entity.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventDAO extends JpaRepository<EventEntity, Integer> {

}
