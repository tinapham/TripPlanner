package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.TourGuideEntity;
import com.mgmtp.screens.entity.UserEntity;
import com.mgmtp.screens.model.TourGuideDTO;
import com.mgmtp.screens.model.UpdatingUserDTO;
import com.mgmtp.screens.model.UserDTO;
import com.mgmtp.screens.repository.TourGuideDAO;
import com.mgmtp.screens.repository.UserDAO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.mgmtp.screens.constant.SecurityConstants.SECRET;

@Service()
public class TourGuideServiceImpl implements TourGuideService {

    private TourGuideDAO tourGuideDAO;

    @Autowired
    public TourGuideServiceImpl(TourGuideDAO tourGuideDAO) {
        this.tourGuideDAO = tourGuideDAO;
    }

    @Override
    public List<TourGuideDTO> findAll() {
        List<TourGuideEntity> list = tourGuideDAO.findAll();
        if (list == null) {
            return null;
        }
        List<TourGuideDTO> tourGuides = new ArrayList<>();
        for (TourGuideEntity item : list) {
            tourGuides.add(TourGuideDTO.fromEntity(item));
        }
        return tourGuides;
    }

    @Override
    public boolean deleteById(Integer id) {
        try {
            if(tourGuideDAO.getOne(id) == null) return false;
            tourGuideDAO.delete(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
