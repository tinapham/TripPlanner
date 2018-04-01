package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.*;
import com.mgmtp.screens.model.AttractionDTO;
import com.mgmtp.screens.model.EventDTO;
import com.mgmtp.screens.model.PlanDTO;
import com.mgmtp.screens.repository.EventDAO;
import com.mgmtp.screens.repository.PlanDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service()
public class PlanServiceImpl implements PlanService {

	private PlanDAO planDAO;

	private EventDAO eventDAO;

	@Autowired
	public PlanServiceImpl(PlanDAO planDAO, EventDAO eventDAO) {
		this.eventDAO = eventDAO;
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
		planEntity.setName(planDTO.getName());
		planEntity.setStartDay(planDTO.getStartDay());
		planEntity.setEndDay(planDTO.getEndDay());
		deleteDiffEvent(planEntity.getEvents(), planDTO.getEvents());
		planEntity.setEvents(covertListEventDTOToEntity(planDTO.getEvents(), planEntity));
		planDAO.save(planEntity);
	}

	private void deleteDiffEvent(List<EventEntity> oldList, List<EventDTO> newList) {
		for (EventEntity eventEntity : oldList) {
			if (!isExistInEventDTOList(eventEntity, newList)) {
				eventDAO.delete(eventEntity);
			}
		}
	}

	private boolean isExistInEventDTOList(EventEntity eventEntity, List<EventDTO> newEventDTOList) {
		for (EventDTO eventDTO : newEventDTOList) {
			if (eventDTO.getId() != null && eventEntity.getId().equals(eventDTO.getId())) {
				return true;
			}
		}
		return false;
	}

	private List<EventEntity> covertListEventDTOToEntity(List<EventDTO> listEventDTO,
														   PlanEntity planEntity) {
		List<EventEntity> events = new ArrayList<>();
		for (EventDTO item : listEventDTO) {
			EventEntity eventEntity = new EventEntity(item.getStartTime(), item.getEndTime(),
					planEntity);
			AttractionDTO attractionDTO = item.getAttraction();
			eventEntity.setAttraction(new AttractionEntity(attractionDTO.getName(), attractionDTO.getAddress(),
													attractionDTO.getLat(), attractionDTO.getLng(),
													attractionDTO.getType(), attractionDTO.getDescription()));
			events.add(eventEntity);
		}
		return events;
	}

}
