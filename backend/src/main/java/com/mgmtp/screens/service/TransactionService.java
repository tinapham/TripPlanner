package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.PlanEntity;
import com.mgmtp.screens.entity.UserEntity;
import com.mgmtp.screens.model.TransactionDTO;

import java.util.List;

public interface TransactionService {

	boolean isExist(Integer id);

	void deleteById(Integer id);

	TransactionDTO findByPlan(PlanEntity planEntity);

	void addNewTransaction(TransactionDTO transactionDTO, Integer planId);

	void updateTransaction(TransactionDTO transactionDTO);

	void updatePaidStatus (Integer transactionId, boolean status);

}
