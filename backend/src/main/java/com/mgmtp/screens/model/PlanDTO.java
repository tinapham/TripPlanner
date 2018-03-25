package com.mgmtp.screens.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mgmtp.screens.entity.EventEntity;
import com.mgmtp.screens.entity.PlanEntity;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PlanDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private Integer id;

	private final String name;

	@JsonProperty("start-day")
	private final String startDay;

	@JsonProperty("end-day")
	private final String endDay;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	@JsonProperty("events")
	private List<EventDTO> events;

	public PlanDTO(@JsonProperty("id") Integer id, @JsonProperty("name") String name,
				  @JsonProperty("start-day") String startDay, @JsonProperty("end-day") String endDay,
				  @JsonProperty("events") List<EventDTO> events) {
		this.id = id;
		this.name = name;
		this.startDay = startDay;
		this.endDay = endDay;
		this.events = events;
	}

	public Integer getId() {
		return id;
	}

	public String getName() { return name; }

	public String getStartDay() { return startDay; }

	public String getEndDay() { return endDay; }

	public List<EventDTO> getEvents() { return events; }

	public void setEvents(List<EventDTO> events) { this.events = events; }

	public static PlanDTO fromEntityByAdmin(PlanEntity input) {
		List<EventDTO> events = new ArrayList<>();
		for (EventEntity item : input.getEvents()) {
			events.add(EventDTO.fromEntityByAdmin(item));
		}
		return new PlanDTO(input.getId(), input.getName(), input.getStartDay(), input.getEndDay(), events);
	}

}
