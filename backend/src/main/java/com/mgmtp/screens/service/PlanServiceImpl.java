package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.*;
import com.mgmtp.screens.model.PlanDTO;
import com.mgmtp.screens.repository.PlanDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service()
public class PlanServiceImpl implements PlanService {

	private PlanDAO planDAO;

	@Autowired
	public PlanServiceImpl(PlanDAO planDAO) {
		this.planDAO = planDAO;
	}

	@Override
	public boolean isExist(Integer id) {
		return (planDAO.findOne(id) != null);
	}

	@Override
	public PlanDTO findByName(String name) {
		PlanEntity planEntity = planDAO.getPlanEntityByName(name);
		return PlanDTO.fromEntityByAdmin(planEntity);
	}

	@Override
	public void deleteById(Integer id) {
		planDAO.delete(id);
	}

	@Override
	public List<PlanDTO> findAll(boolean isPrivate) {
		List<PlanEntity> list = planDAO.findAll();
		if (list == null || !isPrivate) {
			return null;
		}
		List<PlanDTO> planDTOS = new ArrayList<>();
		for (PlanEntity item : list) {
			planDTOS.add(PlanDTO.fromEntityByAdmin(item));
		}
		return planDTOS;
	}

	@Override
	public List<PlanDTO> findAllByUser(String email) {
		return null;
	}

	@Override
	public void addNewPlan(PlanDTO planDTO, UserEntity user) {
//		PlanEntity planEntity = new PlanEntity(planDTO.getName(),
//				planDTO.getStartDay(), planDTO.getEndDay(),
//				planDTO.getEvents());
//		planDAO.save(planEntity);
	}

	@Override
	public void addNewPlan(PlanDTO planDTO) {

	}

	@Override
	@Transactional
	public void updatePlan(int id, PlanDTO planDTO) {
		PlanEntity planEntity = planDAO.findOne(id);
		planEntity.setName(screenPlayDTO.getName());
		planEntity.setDisplayTime(screenPlayDTO.getDisplayTime());
		deleteDiffScreen(screenPlayEntity.getScreens(), screenPlayDTO.getScreens());
		planEntity.setScreens(covertListScreenDTOToEntity(screenPlayDTO.getScreens(), screenPlayEntity));
		planDAO.save(planEntity);
	}

}
