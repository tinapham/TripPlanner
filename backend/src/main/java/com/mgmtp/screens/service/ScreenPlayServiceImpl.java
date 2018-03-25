package com.mgmtp.screens.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mgmtp.screens.entity.*;
import com.mgmtp.screens.model.*;
import com.mgmtp.screens.repository.*;

@Service()
public class ScreenPlayServiceImpl implements ScreenPlayService {

	private ScreenPlayDAO screenPlayDAO;

	private ScreenDAO screenDAO;

	private AppDAO appDAO;

	@Autowired
	public ScreenPlayServiceImpl(ScreenPlayDAO screenPlayDAO, ScreenDAO screenDAO, AppDAO appDAO) {
		this.screenPlayDAO = screenPlayDAO;
		this.screenDAO = screenDAO;
		this.appDAO = appDAO;
	}

	@Override
	public boolean isExist(Integer id) {
		return (screenPlayDAO.findOne(id) != null);
	}

	@Override
	public ScreenPlayDTO findByName(String name, boolean isAdmin) {
		ScreenPlayEntity screenPlay = screenPlayDAO.getScreenPlayEntityByName(name);
		if (screenPlay == null) {
			return null;
		}
		return isAdmin ? ScreenPlayDTO.fromEntityByAdmin(screenPlay) : ScreenPlayDTO.fromEntity(screenPlay);
	}

	@Override
	public void deleteById(Integer id) {
		screenPlayDAO.delete(id);
	}

	@Override
	public List<ScreenPlayDTO> findAll(boolean isPrivate) {
		List<ScreenPlayEntity> list = screenPlayDAO.findAll();
		if (list == null) {
			return null;
		}
		List<ScreenPlayDTO> screenPlays = new ArrayList<>();
		for (ScreenPlayEntity item : list) {
			if (isPrivate) {
				screenPlays.add(ScreenPlayDTO.fromEntityByAdmin(item));
			} else {
				screenPlays.add(ScreenPlayDTO.fromEntity(item));
			}
		}
		return screenPlays;
	}

	@Override
	public List<ScreenPlayDTO> findAllByUser(String email) {
		List<ScreenPlayEntity> list = screenPlayDAO.getAllByUser_Email(email);
		if (list == null) {
			return null;
		}
		List<ScreenPlayDTO> screenPlays = new ArrayList<>();
		for (ScreenPlayEntity item : list) {
			screenPlays.add(ScreenPlayDTO.fromEntityByAdmin(item));
		}
		return screenPlays;
	}

	@Override
	public void addNewScreenPlay(ScreenPlayDTO screenPlayDTO, UserEntity user) {
		ScreenPlayEntity screenPlayEntity = new ScreenPlayEntity(screenPlayDTO.getName(),
				screenPlayDTO.getDisplayTime(), user);
		screenPlayEntity.setScreens(covertListScreenDTOToEntity(screenPlayDTO.getScreens(), screenPlayEntity));
		screenPlayDAO.save(screenPlayEntity);
	}

	@Override
	public void addNewScreenPlay(ScreenPlayDTO screenPlayDTO) {
		ScreenPlayEntity screenPlayEntity = new ScreenPlayEntity(screenPlayDTO.getName(),
				screenPlayDTO.getDisplayTime());
		screenPlayEntity.setScreens(covertListScreenDTOToEntity(screenPlayDTO.getScreens(), screenPlayEntity));
		screenPlayDAO.save(screenPlayEntity);
	}

	@Override
	@Transactional
	public void updateScreenPlay(int id, ScreenPlayDTO screenPlayDTO) {
		ScreenPlayEntity screenPlayEntity = screenPlayDAO.findOne(id);
		screenPlayEntity.setName(screenPlayDTO.getName());
		screenPlayEntity.setDisplayTime(screenPlayDTO.getDisplayTime());
		deleteDiffScreen(screenPlayEntity.getScreens(), screenPlayDTO.getScreens());
		screenPlayEntity.setScreens(covertListScreenDTOToEntity(screenPlayDTO.getScreens(), screenPlayEntity));
		screenPlayDAO.save(screenPlayEntity);
	}

	private List<ScreenEntity> covertListScreenDTOToEntity(List<ScreenDTO> listScreenDTO,
			ScreenPlayEntity screenPlayEntity) {
		List<ScreenEntity> screens = new ArrayList<>();
		for (ScreenDTO item : listScreenDTO) {
			ScreenEntity screenEntity = new ScreenEntity(item.getId(), item.getType(), item.getAnimationType(),
					item.getRows(), item.getCols(), screenPlayEntity);
			screenEntity.setApps(convertListAppDTOToEntity(item.getApps(), screenEntity));
			screens.add(screenEntity);
		}
		return screens;
	}

	private List<AppEntity> convertListAppDTOToEntity(List<AppDTO> listAppDTO, ScreenEntity screen) {
		if (screen.getId() != null) {
			deleteDiffApp(screen.getId(), listAppDTO);
		}
		List<AppEntity> apps = new ArrayList<>();
		for (AppDTO item : listAppDTO) {
			AppEntity appEntity = new AppEntity(item.getId(), item.getType(), screen);
			appEntity.setParameters(convertListMapParameterToList(item.getAdminParams(), appEntity));
			apps.add(appEntity);
		}
		return apps;
	}

	private List<ParameterEntity> convertListMapParameterToList(List<Map<String, String>> parameterList,
			AppEntity appEntity) {
		List<ParameterEntity> parameters = new ArrayList<>();
		if(parameterList != null){
			for (Map<String, String> item : parameterList) {
				ParameterEntity param;
				if (item.get("id") != null) {
					param = new ParameterEntity(Integer.parseInt(item.get("id")), item.get("key"), item.get("value"),
							appEntity);
				} else {
					param = new ParameterEntity(item.get("key"), item.get("value"), appEntity);
				}
				parameters.add(param);
			}
		}
		return parameters;
	}

	private void deleteDiffScreen(List<ScreenEntity> oldScreenEntityList, List<ScreenDTO> newScreenDTOList) {
		for (ScreenEntity screenEntity : oldScreenEntityList) {
			if (!isExistInScreenDTOList(screenEntity, newScreenDTOList)) {
				screenDAO.delete(screenEntity);
			}
		}
	}

	private boolean isExistInScreenDTOList(ScreenEntity screenEntity, List<ScreenDTO> newScreenDTOList) {
		for (ScreenDTO screen : newScreenDTOList) {
			if (screen.getId() != null && screenEntity.getId().equals(screen.getId())) {
				return true;
			}
		}
		return false;
	}

	private void deleteDiffApp(Integer screenId, List<AppDTO> newAppDTOList) {
		ScreenEntity screen = screenDAO.findOne(screenId);
		List<AppEntity> oldAppEntityList = screen.getApps();
		for (AppEntity appEntity : oldAppEntityList) {
			if (!isExistInAppDTOList(appEntity, newAppDTOList)) {
				appDAO.delete(appEntity);
			}
		}
	}

	private boolean isExistInAppDTOList(AppEntity appEntity, List<AppDTO> newAppDTOList) {
		for (AppDTO app : newAppDTOList) {
			if (app.getId() != null && appEntity.getId().equals(app.getId())) {
				return true;
			}
		}
		return false;
	}

}
