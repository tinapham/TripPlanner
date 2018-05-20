package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.*;
import com.mgmtp.screens.model.AttractionDTO;
import com.mgmtp.screens.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service()
public class AttractionServiceImpl implements AttractionService {

	private AttractionDAO attractionDAO;

	private AttractionRepo attractionRepo;

	private TypeDAO typeDAO;

	private FavoriteDAO favoriteDAO;

	private FeedbackDAO feedbackDAO;

	@Autowired
	public AttractionServiceImpl(AttractionDAO attractionDAO, AttractionRepo attractionRepo, TypeDAO typeDAO,
								 FavoriteDAO favoriteDAO, FeedbackDAO feedbackDAO) {
		this.typeDAO = typeDAO;
		this.attractionDAO = attractionDAO;
		this.attractionRepo = attractionRepo;
		this.favoriteDAO = favoriteDAO;
		this.feedbackDAO = feedbackDAO;
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
			List<FeedbackEntity> feedbackEntities = feedbackDAO.getAllByAttraction(item);
			item.setFeedback(feedbackEntities);
			attractionDTOS.add(AttractionDTO.fromEntityByAdmin(item));
		}
		return attractionDTOS;
	}

	@Override
	public List<AttractionDTO> findAllByUser(UserEntity userEntity){
		List<AttractionDTO> list = attractionRepo.getAllByUser(userEntity);
		return list;
	}


	@Override
	public void addNewAttraction(AttractionDTO attractionDTO) {
		TypeEntity type = typeDAO.getTypeEntityByName(attractionDTO.getType());

		AttractionEntity attractionEntity = new AttractionEntity(attractionDTO.getName(),
				attractionDTO.getAddress(), attractionDTO.getLat(),
				attractionDTO.getLng(), type,
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

			TypeEntity type = typeDAO.getTypeEntityByName(attractionDTO.getType());
			attractionEntity.setType(type);
			attractionEntity.setDescription(attractionDTO.getDescription());
			attractionDAO.save(attractionEntity);
		}
	}

	@Override
	public void updateFavorite(int id, UserEntity user) {
		AttractionEntity attraction = attractionDAO.findOne(id);
		FavoriteEntity favorite = favoriteDAO.getFavoriteEntityByUserAndAttraction(user, attraction);
		if (favorite == null) {
			favorite = new FavoriteEntity(0, true, user, attraction);
		} else {
			favorite.setUserChoose(!favorite.isUserChoose());
		}
		favoriteDAO.saveAndFlush(favorite);
	}

}
