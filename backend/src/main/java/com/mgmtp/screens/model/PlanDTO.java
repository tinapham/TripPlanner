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

	@JsonProperty("events")
	private List<EventDTO> events;

	@JsonProperty("transaction")
	private TransactionDTO transaction;

	public PlanDTO(@JsonProperty("id") Integer id, @JsonProperty("name") String name,
				  @JsonProperty("start-day") String startDay, @JsonProperty("end-day") String endDay,
				  @JsonProperty("events") List<EventDTO> events, @JsonProperty("transaction") TransactionDTO transaction) {
		this.id = id;
		this.name = name;
		this.startDay = startDay;
		this.endDay = endDay;
		this.events = events;
		this.transaction = transaction;
	}

	public Integer getId() {
		return id;
	}

	public String getName() { return name; }

	public String getStartDay() { return startDay; }

	public String getEndDay() { return endDay; }

	public List<EventDTO> getEvents() { return events; }

	public TransactionDTO getTransaction() { return transaction; }

	public static PlanDTO fromEntityByAdmin(PlanEntity input) {
		List<EventDTO> events = new ArrayList<>();
		try {
			List<EventEntity> eventEntities = input.getEvents();
			if(eventEntities != null ) {
				for (EventEntity item : eventEntities) {
					events.add(EventDTO.fromEntityByAdmin(item));
				}
			}
		} catch (Exception e) {
			System.out.println("Null Point");
		}
		TransactionDTO transaction = new TransactionDTO();
		try {
			if(input.getTransaction() != null) {
				transaction = TransactionDTO.fromEntity(input.getTransaction());
			}
		} catch (Exception e) {
			System.out.println("Null Point");
		}

		return new PlanDTO(input.getId(), input.getName(), input.getStartDay(), input.getEndDay(), events, transaction);
	}

}
