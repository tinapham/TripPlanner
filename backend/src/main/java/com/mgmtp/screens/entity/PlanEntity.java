package com.mgmtp.screens.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "plans")
public class PlanEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column()
	private Integer id;

	@Column(nullable = false)
	private String name;

	@Column(name = "start_day")
	private String startDay;

	@Column(name = "end_day")
	private String endDay;

	@OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
	private List<EventEntity> events;

	public PlanEntity() { }

	public PlanEntity(String name) { this.name = name; }

	public PlanEntity(String name, String startDay, String endDay, List<EventEntity> events) {
		this.name = name;
		this.startDay = startDay;
		this.endDay = endDay;
		this.events = events;
	}

	public Integer getId() { return id; }

	public void setId(Integer id) { this.id = id; }

	public String getName() { return name; }

	public void setName(String name) { this.name = name; }

	public String getStartDay() { return startDay; }

	public void setStartDay(String startDay) { this.startDay = startDay; }

	public String getEndDay() { return endDay; }

	public void setEndDay(String endDay) { this.endDay = endDay; }

	public List<EventEntity> getEvents() { return events; }

	public void setEvents(List<EventEntity> events) { this.events = events; }

}
