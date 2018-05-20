package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.*;
import com.mgmtp.screens.model.FeedbackDTO;
import com.mgmtp.screens.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service()
public class FeedbackServiceImpl implements FeedbackService {

	private FeedbackDAO feedbackDAO;

	private AttractionDAO attractionDAO;

	@Autowired
	public FeedbackServiceImpl(FeedbackDAO feedbackDAO, AttractionDAO attractionDAO) {
		this.feedbackDAO = feedbackDAO;
		this.attractionDAO = attractionDAO;
	}

	@Override
	public void addFeedback(FeedbackDTO feedbackDTO, Integer attractionId, UserEntity userEntity) {

		FeedbackEntity feedbackEntity = new FeedbackEntity();

		AttractionEntity attractionEntity = attractionDAO.findOne(attractionId);
		feedbackEntity.setAttraction(attractionEntity);

		feedbackEntity.setUser(userEntity);
		feedbackEntity.setContent(feedbackDTO.getContent());
		feedbackEntity.setRating(feedbackDTO.getRating());

		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String currentDate = df.format(new Date()).toString();
		feedbackEntity.setCreatedAt(currentDate);

		feedbackDAO.save(feedbackEntity);
	}

}
