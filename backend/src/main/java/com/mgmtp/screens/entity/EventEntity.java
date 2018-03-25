package com.mgmtp.screens.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "events")
public class EventEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column()
	private Integer id;

	@Column(name = "start_time")
	private String startTime;

	@Column(name = "end_time")
	private String endTime;

//	@Column(name = "market_id", nullable = false)
//	private Integer marketId;

	@ManyToOne
	@JoinColumn(name = "attraction_id", nullable = false)
	private AttractionEntity attraction;

	@ManyToOne
	@JoinColumn(name = "plan_id", nullable = false)
	private PlanEntity plan;

	public EventEntity() { }

	public EventEntity(String startTime, String endTime, AttractionEntity attraction, PlanEntity plan) {
		this.startTime = startTime;
		this.endTime = endTime;
		this.attraction = attraction;
		this.plan = plan;
	}

	public Integer getId() { return id; }

	public void setId(Integer id) { this.id = id; }

	public String getStartTime() { return startTime; }

	public void setStartTime(String startTime) { this.startTime = startTime; }

	public String getEndTime() { return endTime; }

	public void setEndTime(String endTime) { this.endTime = endTime; }

	public AttractionEntity getAttraction() { return attraction; }

	public void setAttraction(AttractionEntity attraction) { this.attraction = attraction; }

	public PlanEntity getPlan() { return plan; }

	public void setPlan(PlanEntity plan) { this.plan = plan; }

}