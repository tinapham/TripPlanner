package com.mgmtp.screens.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mgmtp.screens.entity.EventEntity;

import java.io.Serializable;

public class EventDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private Integer id;

	@JsonProperty("start-time")
	private final String startTime;

	@JsonProperty("end-time")
	private final String endTime;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	@JsonProperty("attraction")
	private AttractionDTO attraction;

	public EventDTO() {
		this.id = null;
		this.startTime = "";
		this.endTime = "";
		this.attraction = new AttractionDTO();
	}

	public EventDTO(@JsonProperty("id") Integer id, @JsonProperty("start-time") String startTime,
					@JsonProperty("end-time") String endTime, @JsonProperty("attraction") AttractionDTO attraction) {
		this.id = id;
		this.startTime = startTime;
		this.endTime = endTime;
		this.attraction = attraction;
	}

	public Integer getId() {
		return id;
	}

	public String getStartTime() { return startTime; }

	public String getEndTime() { return endTime; }

	public AttractionDTO getAttraction() { return attraction; }

	public static EventDTO fromEntityByAdmin(EventEntity input) {
		AttractionDTO attraction = AttractionDTO.fromEntityByAdmin(input.getAttraction());
		return new EventDTO(input.getId(), input.getStartTime(), input.getEndTime(), attraction);
	}

}
