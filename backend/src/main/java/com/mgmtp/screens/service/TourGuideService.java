package com.mgmtp.screens.service;

import com.mgmtp.screens.model.TourGuideDTO;
import java.util.List;

public interface TourGuideService {

    List<TourGuideDTO> findAll();

    boolean deleteById(Integer id);

}
