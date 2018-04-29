package com.mgmtp.screens.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mgmtp.screens.entity.TransactionEntity;

import java.io.Serializable;

public class TransactionDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private Integer id;

	@JsonProperty("hours")
	private float hours;

	@JsonProperty("cost")
	private float cost;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	@JsonProperty("tour-guide")
	private TourGuideDTO tourGuide;

	public TransactionDTO(@JsonProperty("id") Integer id, @JsonProperty("hours") float hours,
						  @JsonProperty("cost") float cost, @JsonProperty("tour-guide") TourGuideDTO tourGuide) {
		this.id = id;
		this.cost = cost;
		this.hours = hours;
		this.tourGuide = tourGuide;
	}

	public Integer getId() {
		return id;
	}

	public float getHours() { return hours; }

	public float getCost() { return cost; }

	public TourGuideDTO getTourGuide() { return tourGuide; }

	public static TransactionDTO fromEntity(TransactionEntity transaction) {
		TourGuideDTO tourGuideDTO = TourGuideDTO.fromEntity(transaction.getTourGuide());
		return new TransactionDTO(transaction.getId(), transaction.getHours(), transaction.getCost(), tourGuideDTO);
	}

}
