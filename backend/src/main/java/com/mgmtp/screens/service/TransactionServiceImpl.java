package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.*;
import com.mgmtp.screens.model.*;
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

    @Autowired
    public TransactionServiceImpl(TransactionDAO transactionDAO, TransactionRepo transactionRepo) {

        this.transactionDAO = transactionDAO;
        this.transactionRepo = transactionRepo;

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
    public List<TransactionDTO> findAllByUser(UserEntity user) {
//        List<TransactionEntity> list = planDAO.findAll();
//        if (list == null || !isPrivate) {
//            return null;
//        }
//        List<PlanDTO> planDTOS = new ArrayList<>();
//        for (PlanEntity item : list) {
//            planDTOS.add(PlanDTO.fromEntityByAdmin(item));
//        }
//        return planDTOS;
        return null;
    }

    @Override
    public TransactionDTO findByPlan(PlanEntity planEntity) {

        TransactionEntity transactionEntity = transactionDAO.getDistinctByPlan(planEntity);
        return TransactionDTO.fromEntity(transactionEntity);

    }

    @Override
    public void addNewTransaction(TransactionDTO transactionDTO, Integer planId) {

        TransactionEntity transactionEntity = new TransactionEntity(transactionDTO.getHours(), transactionDTO.getCost(),
                                                                    transactionDTO.getStatus());
        transactionRepo.addNewTransaction(transactionEntity, planId, transactionDTO.getTourGuide().getId());

    }

    @Override
    @Transactional
    public void updateTransaction(TransactionDTO transactionDTO) {

        TransactionEntity transactionEntity = transactionDAO.findOne(transactionDTO.getId());
        transactionEntity.setHours(transactionDTO.getHours());
        transactionEntity.setCost(transactionDTO.getCost());

        transactionRepo.updateTransaction(transactionEntity, transactionDTO.getTourGuide().getId());

    }

}
