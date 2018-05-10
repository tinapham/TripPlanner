package com.mgmtp.screens.service;

import com.mgmtp.screens.model.*;
import com.mgmtp.screens.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service()
public class ChartServiceImpl implements ChartService {

    private TransactionRepo transactionRepo;

    @Autowired
    public ChartServiceImpl(TransactionRepo transactionRepo) {
        this.transactionRepo = transactionRepo;
    }

    public List<BarChartDTO> getBarChartData() {
        return transactionRepo.getBarChartData();
    }

}
