package com.mgmtp.screens.repository;

import com.mgmtp.screens.entity.EventEntity;
import com.mgmtp.screens.entity.PlanEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PlanRepo {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public boolean updatePlan(PlanEntity plan) {
        try {
            jdbcTemplate.update("UPDATE Plans SET name = ?, start_day= ?, end_day= ? WHERE id = ?",
                    plan.getName(), plan.getStartDay(), plan.getEndDay(), plan.getId());
            for(EventEntity event: plan.getEvents()) {
                if(event.getId() != null) {
                    jdbcTemplate.update("UPDATE Events SET start_time= ?, end_time= ?, attraction_id= ?, plan_id= ?  WHERE id = ?",
                            event.getStartTime(), event.getEndTime(), event.getAttraction().getId(), plan.getId(), event.getId());
                } else {
//                    jdbcTemplate.update("INSERT INTO Events (start_time, end_time, attraction_id, plan_id) VALUES " +
//                                    "(?, ?, ?, ?)", event.getStartTime(), event.getEndTime(), event.getAttraction().getId(),
//                                plan.getId());
                    addNewEvent(event, plan.getId());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public boolean addNewEvent(EventEntity event, Integer planId) {
        try {
            jdbcTemplate.update("INSERT INTO Events (start_time, end_time, attraction_id, plan_id) VALUES " +
                            "(?, ?, ?, ?)", event.getStartTime(), event.getEndTime(), event.getAttraction().getId(),
                    planId);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

}
