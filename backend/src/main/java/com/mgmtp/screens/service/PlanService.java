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

	void addNewPlan(PlanDTO planDTO);

	void updatePlan(int id, PlanDTO planDTO);

}
