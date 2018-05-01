package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.*;
import com.mgmtp.screens.model.*;
import com.mgmtp.screens.repository.TourGuideDAO;
import com.mgmtp.screens.repository.TransactionDAO;
import com.mgmtp.screens.repository.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service()
public class TransactionServiceImpl implements TransactionService {

    private TransactionDAO transactionDAO;

    private TransactionRepo transactionRepo;

    private TourGuideDAO tourGuideDAO;

    @Autowired
    public TransactionServiceImpl(TransactionDAO transactionDAO, TransactionRepo transactionRepo, TourGuideDAO tourGuideDAO) {
        this.transactionDAO = transactionDAO;
        this.transactionRepo = transactionRepo;
        this.tourGuideDAO = tourGuideDAO;
    }

    @Override
    public boolean isExist(Integer id) {
        return (transactionDAO.findOne(id) != null);
    }

    @Override
    public void deleteById(Integer id) {
        transactionDAO.delete(id);
    }

    @Override
    public TransactionDTO findByPlan(PlanEntity planEntity) {

        TransactionEntity transactionEntity = transactionDAO.getDistinctByPlan(planEntity);
        return TransactionDTO.fromEntity(transactionEntity);

    }

    @Override
    public void addNewTransaction(TransactionDTO transactionDTO, Integer planId) {

        TransactionEntity transactionEntity = new TransactionEntity(transactionDTO.getDays(), transactionDTO.getCost());
        transactionRepo.addNewTransaction(transactionEntity, planId, transactionDTO.getTourGuide().getId());

    }

    @Override
    @Transactional
    public void updateTransaction(TransactionDTO transactionDTO) {

        TransactionEntity transactionEntity = transactionDAO.findOne(transactionDTO.getId());
        transactionEntity.setDays(transactionDTO.getDays());
        transactionEntity.setCost(transactionDTO.getCost());

        TourGuideEntity tourGuideEntity = tourGuideDAO.findOne(transactionDTO.getTourGuide().getId());
        transactionEntity.setTourGuide(tourGuideEntity);

        transactionDAO.saveAndFlush(transactionEntity);

    }

    @Override
    public void updatePaidStatus (Integer transactionId, boolean status) {

        TransactionEntity transactionEntity = transactionDAO.findOne(transactionId);
        transactionEntity.setPaid(status);
        transactionDAO.saveAndFlush(transactionEntity);

    }

}
