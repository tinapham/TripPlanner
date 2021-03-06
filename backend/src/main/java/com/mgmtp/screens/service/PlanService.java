package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.UserEntity;
import com.mgmtp.screens.model.PlanDTO;

import java.util.List;

public interface PlanService {

	boolean isExist(Integer id);

	PlanDTO findByName(String name);

	void deleteById(Integer id);

	List<PlanDTO> findAll(boolean isPrivate);

	List<PlanDTO> findAllByUser(String email);

	void addNewPlan(PlanDTO planDTO, UserEntity user);

	void updatePlan(int id, PlanDTO planDTO, UserEntity user);

	void updatePlan(int id, PlanDTO planDTO, String token, UserEntity user);

	String getPaymentToken(Integer planId);

}
