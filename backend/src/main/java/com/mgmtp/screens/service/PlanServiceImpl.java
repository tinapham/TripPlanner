package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.*;
import com.mgmtp.screens.model.AttractionDTO;
import com.mgmtp.screens.model.EventDTO;
import com.mgmtp.screens.model.PlanDTO;
import com.mgmtp.screens.model.TransactionDTO;
import com.mgmtp.screens.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service()
public class PlanServiceImpl implements PlanService {

    private PlanDAO planDAO;

    private EventDAO eventDAO;

    private UserService userService;

    private TransactionService transactionService;

    private TourGuideDAO tourGuideDAO;

    private TransactionDAO transactionDAO;

    @Autowired
    public PlanServiceImpl(PlanDAO planDAO, EventDAO eventDAO, UserService userService,
                           TransactionService transactionService, TourGuideDAO tourGuideDAO,
                           TransactionDAO transactionDAO) {
        this.eventDAO = eventDAO;
        this.planDAO = planDAO;
        this.userService = userService;
        this.transactionService = transactionService;
        this.tourGuideDAO = tourGuideDAO;
        this.transactionDAO = transactionDAO;
    }

    @Override
    public boolean isExist(Integer id) {
        return (planDAO.findOne(id) != null);
    }

    @Override
    public PlanDTO findByName(String name) {
        PlanEntity planEntity = planDAO.getDistinctByName(name);
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
        UserEntity userEntity = userService.getUserEntity(email);
        List<PlanEntity> list = planDAO.getPlanEntitiesByUser(userEntity);
        if (list == null) {
            return null;
        }
        List<PlanDTO> planDTOS = new ArrayList<>();
        for (PlanEntity item : list) {
            planDTOS.add(PlanDTO.fromEntityByAdmin(item));
        }
        return planDTOS;
    }

    @Override
    @Transactional
    public void addNewPlan(PlanDTO planDTO, UserEntity user) {

        PlanEntity planEntity = new PlanEntity(planDTO.getName(),
                planDTO.getStartDay(), planDTO.getEndDay(),
                null, user);

        if (planDTO.getEvents() != null) {
            planEntity.setEvents(covertListEventDTOToEntity(planDTO.getEvents(), planEntity));
        }
        planDAO.save(planEntity);

        TransactionEntity transactionEntity = new TransactionEntity(tourGuideDAO.findOne(1), false);
        PlanEntity planEntity1 = planDAO.getDistinctByName(planDTO.getName());
        transactionEntity.setPlan(planEntity1);
        transactionDAO.saveAndFlush(transactionEntity);

    }

    @Override
    public String getPaymentToken(Integer planId) {
        PlanEntity planEntity = planDAO.findOne(planId);
        return planEntity.getPaymentToken();
    }

    @Override
    @Transactional
    public void updatePlan(int id, PlanDTO planDTO) {

        PlanEntity planEntity = planDAO.findOne(id);

        planEntity.setName(planDTO.getName());
        planEntity.setStartDay(planDTO.getStartDay());
        planEntity.setEndDay(planDTO.getEndDay());

        TransactionDTO transactionDTO = planDTO.getTransaction();
        if (transactionDTO.getId() != null) {
            System.out.print(transactionDTO.getId());
            transactionService.updateTransaction(transactionDTO);
        } else {
            System.out.print(transactionDTO.getCost());
            transactionService.addNewTransaction(transactionDTO, planDTO.getId());
        }



        deleteDiffEvent(planEntity.getEvents(), planDTO.getEvents());
        if (planDTO.getEvents() != null) {
            planEntity.setEvents(covertListEventDTOToEntity(planDTO.getEvents(), planEntity));
        }

        planDAO.saveAndFlush(planEntity);
    }

    @Override
    @Transactional
    public void updatePlan(int id, PlanDTO planDTO, String token) {

        PlanEntity planEntity = planDAO.findOne(id);

        planEntity.setName(planDTO.getName());
        planEntity.setStartDay(planDTO.getStartDay());
        planEntity.setEndDay(planDTO.getEndDay());

        TransactionDTO transactionDTO = planDTO.getTransaction();
        if (transactionDTO.getId() != null) {
            transactionService.updateTransaction(transactionDTO);
        } else {
            transactionService.addNewTransaction(transactionDTO, planDTO.getId());
        }

        if (planEntity.getPaymentToken().equals(token)) {
            TransactionDTO transaction = transactionService.findByPlan(planEntity);
            if (transaction.getId() != null) {
                transactionService.updatePaidStatus(transaction.getId(), true);
            }
        }

        if (planDTO.getEvents() != null) {
            planEntity.setEvents(covertListEventDTOToEntity(planDTO.getEvents(), planEntity));
        }
        planDAO.saveAndFlush(planEntity);
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
            EventEntity eventEntity;
            if (item.getId() != null) {
                eventEntity = new EventEntity(item.getId(), item.getStartTime(), item.getEndTime(), planEntity);
            } else {
                eventEntity = new EventEntity(item.getStartTime(), item.getEndTime(), planEntity);
            }
            AttractionDTO attractionDTO = item.getAttraction();
            eventEntity.setAttraction(new AttractionEntity(attractionDTO.getId(), attractionDTO.getName(),
                    attractionDTO.getAddress(), attractionDTO.getLat(),
                    attractionDTO.getLng(), attractionDTO.getType(),
                    attractionDTO.getDescription()));
            events.add(eventEntity);
        }
        return events;
    }

}
