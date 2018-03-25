package com.mgmtp.screens.repository;

import com.mgmtp.screens.entity.PlanEntity;
import com.mgmtp.screens.service.PlanService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlanDAO extends JpaRepository<PlanEntity, Integer> {

    PlanEntity getPlanEntityByName(@Param("name") String name);

}
