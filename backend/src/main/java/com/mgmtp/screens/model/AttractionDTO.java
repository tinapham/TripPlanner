package com.mgmtp.screens.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mgmtp.screens.entity.AttractionEntity;
import com.mgmtp.screens.entity.FeedbackEntity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class AttractionDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private Integer id;

	private String name;

	private String address;

	private double lat;

	private double lng;

	private String type;

	private String description;

	@JsonProperty("favorite")
	private FavoriteDTO favorite;

	@JsonProperty("feedbacks")
	private List<FeedbackDTO> feedbackDTOS;

	public AttractionDTO() {
		this.lat = 0;
		this.lng = 0;
	}

	private AttractionDTO(@JsonProperty("id") Integer id, @JsonProperty("name") String name,
						  @JsonProperty("address") String address, @JsonProperty("lat") double lat,
						  @JsonProperty("lng") double lng, @JsonProperty("type") String type,
						  @JsonProperty("description") String description, @JsonProperty("favorite") FavoriteDTO favorite,
						  @JsonProperty("feedbacks") List<FeedbackDTO> feedbackDTOS) {

		this.id = id;
		this.name = name;
		this.address = address;
		this.lat = lat;
		this.lng = lng;
		this.type = type;
		this.description = description;
		this.favorite = favorite;
		this.feedbackDTOS = feedbackDTOS;

	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getAddress() { return address; }

	public double getLat() { return lat; }

	public double getLng() { return lng; }

	public String getType() { return type; }

	public String getDescription() { return description; }

	public void setId(Integer id) { this.id = id; }

	public void setName(String name) { this.name = name; }

	public void setAddress(String address) { this.address = address; }

	public void setLat(double lat) { this.lat = lat; }

	public void setLng(double lng) { this.lng = lng; }

	public void setType(String type) { this.type = type; }

	public void setDescription(String description) { this.description = description; }

	public void setFavorite(FavoriteDTO favorite) { this.favorite = favorite; }

	public List<FeedbackDTO> getFeedbackDTOS() { return feedbackDTOS; }

	public void setFeedbackDTOS(List<FeedbackDTO> feedbackDTOS) { this.feedbackDTOS = feedbackDTOS; }

	public static AttractionDTO fromEntityByAdmin(AttractionEntity attractionEntity) {
		List<FeedbackDTO> feedbackDTOS = new ArrayList<>();
		List<FeedbackEntity> feedbackEntities = attractionEntity.getFeedback();
		if(feedbackEntities != null ) {
			for (FeedbackEntity item : feedbackEntities) {
				feedbackDTOS.add(FeedbackDTO.fromEntityByAdmin(item));
			}
		}
		return new AttractionDTO(attractionEntity.getId(), attractionEntity.getName(), attractionEntity.getAddress(),
				attractionEntity.getLat(), attractionEntity.getLng(),
				attractionEntity.getType().getName(), attractionEntity.getDescription(), null, feedbackDTOS);
	}

}
