package com.mgmtp.screens.repository;

import com.mgmtp.screens.entity.AttractionEntity;
import com.mgmtp.screens.entity.FeedbackEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackDAO extends JpaRepository<FeedbackEntity, Integer> {

    List<FeedbackEntity> getAllByAttraction (AttractionEntity attractionEntity);

}
