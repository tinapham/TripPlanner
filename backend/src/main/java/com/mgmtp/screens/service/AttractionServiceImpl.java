package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.AttractionEntity;
import com.mgmtp.screens.model.AttractionDTO;
import com.mgmtp.screens.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service()
public class AttractionServiceImpl implements AttractionService {

	private AttractionDAO attractionDAO;

	private EventDAO eventDAO;

	@Autowired
	public AttractionServiceImpl(AttractionDAO attractionDAO, EventDAO eventDAO) {
		this.eventDAO = eventDAO;
		this.attractionDAO = attractionDAO;
	}

	@Override
	public boolean isExist(Integer id) {
		return (attractionDAO.findOne(id) != null);
	}

	@Override
	public AttractionDTO findByName(String name) {
		AttractionEntity attractionEntity = attractionDAO.getAttractionEntityByName(name);
		if (attractionEntity == null) {
			return null;
		}
		return AttractionDTO.fromEntityByAdmin(attractionEntity);
	}

	@Override
	public void deleteById(Integer id) {
		attractionDAO.delete(id);
	}

	@Override
	public List<AttractionDTO> findAll() {
		List<AttractionEntity> list = attractionDAO.findAll();
		if (list == null) {
			return null;
		}
		List<AttractionDTO> attractionDTOS = new ArrayList<>();
		for (AttractionEntity item : list) {
			attractionDTOS.add(AttractionDTO.fromEntityByAdmin(item));
		}
		return attractionDTOS;
	}

	@Override
	public void addNewAttraction(AttractionDTO attractionDTO) {
		AttractionEntity attractionEntity = new AttractionEntity(attractionDTO.getName(),
				attractionDTO.getAddress(), attractionDTO.getLat(),
				attractionDTO.getLng(), attractionDTO.getType(),
				attractionDTO.getDescription());
		attractionDAO.save(attractionEntity);
	}

	@Override
	public void updateAttraction(int id, AttractionDTO attractionDTO) {
		if(isExist(attractionDTO.getId())) {
			AttractionEntity attractionEntity = attractionDAO.findOne(id);
			attractionEntity.setName(attractionDTO.getName());
			attractionEntity.setAddress(attractionDTO.getAddress());
			attractionEntity.setLat(attractionDTO.getLat());
			attractionEntity.setLng(attractionDTO.getLng());
			attractionEntity.setType(attractionDTO.getType());
			attractionEntity.setDescription(attractionDTO.getDescription());
			attractionDAO.save(attractionEntity);
		}
	}

}
