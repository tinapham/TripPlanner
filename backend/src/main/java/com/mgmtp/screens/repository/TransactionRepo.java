package com.mgmtp.screens.repository;

import com.mgmtp.screens.entity.TransactionEntity;
import com.mgmtp.screens.model.BarChartDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class TransactionRepo {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public boolean addNewTransaction(TransactionEntity transaction, Integer planId, Integer tourGuideId) {
        try {
            jdbcTemplate.update("INSERT INTO Transactions (days, cost, guide_id, plan_id, paid) VALUES " +
                            "(?, ?, ?, ?, ?)", transaction.getDays(), transaction.getCost(), tourGuideId, planId,
                    transaction.isPaid());
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public List<BarChartDTO> getBarChartData() {
        List<BarChartDTO> list = new ArrayList<>();
        try {
            List<Map<String, Object>> rows = jdbcTemplate.queryForList("SELECT tour_guides.name, SUM(cost)" +
                    "FROM transactions, tour_guides " +
                    "where transactions.guide_id = tour_guides.id " +
                    "GROUP BY tour_guides.name");
            for (Map row : rows) {
                BarChartDTO customer = new BarChartDTO(row.get("name").toString(), Float.parseFloat(row.get("sum").toString()));
                list.add(customer);
            }
        } catch (Exception e) {
            return null;
        }
        return list;
    }

    public List<BarChartDTO> getMonthChart() {
        List<BarChartDTO> list = new ArrayList<>();
        try {
            List<Map<String, Object>> rows = jdbcTemplate.queryForList("SELECT substr(plans.start_day, 0, 8), sum(cost)" +
                    "FROM transactions, plans " +
                    "where transactions.plan_id = plans.id " +
                    "GROUP BY substr(plans.start_day, 0, 8) ORDER BY substr(plans.start_day, 0, 8)");
            for (Map row : rows) {
                BarChartDTO customer = new BarChartDTO(row.get("substr").toString(), Float.parseFloat(row.get("sum").toString()));
                list.add(customer);
            }
        } catch (Exception e) {
            return null;
        }
        return list;
    }

}
