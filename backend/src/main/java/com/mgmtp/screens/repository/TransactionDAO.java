package com.mgmtp.screens.repository;

import com.mgmtp.screens.entity.PlanEntity;
import com.mgmtp.screens.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionDAO extends JpaRepository<TransactionEntity, Integer> {

    TransactionEntity getDistinctByPlan (PlanEntity planEntity);

}
