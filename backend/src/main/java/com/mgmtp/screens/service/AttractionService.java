package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.UserEntity;
import com.mgmtp.screens.model.AttractionDTO;

import java.util.List;

public interface AttractionService {

	boolean isExist(Integer id);

	AttractionDTO findByName(String name);

	void deleteById(Integer id);

	List<AttractionDTO> findAll();

	List<AttractionDTO> findAllByUser(UserEntity userEntity);

	void addNewAttraction(AttractionDTO AttractionDTO);

	void updateAttraction(int id, AttractionDTO AttractionDTO);

	void updateFavorite(int id, UserEntity user);

}
