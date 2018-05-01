package com.mgmtp.screens.repository;

import com.mgmtp.screens.entity.TransactionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TransactionRepo {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public boolean addNewTransaction(TransactionEntity transaction, Integer planId, Integer tourGuideId) {
        try {
            jdbcTemplate.update("INSERT INTO Transactions (days, cost, guide_id, plan_id) VALUES " +
                            "(?, ?, ?, ?)", transaction.getDays(), transaction.getCost(), tourGuideId, planId);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

}
