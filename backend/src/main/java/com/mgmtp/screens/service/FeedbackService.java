package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.UserEntity;
import com.mgmtp.screens.model.AttractionDTO;
import com.mgmtp.screens.model.FeedbackDTO;

import java.util.List;

public interface FeedbackService {

	void addFeedback(FeedbackDTO feedbackDTO, Integer attractionId, UserEntity userEntity);

}
