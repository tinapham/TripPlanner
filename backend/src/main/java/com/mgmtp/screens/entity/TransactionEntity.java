package com.mgmtp.screens.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "transactions")
public class TransactionEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column()
	private Integer id;

	@Column()
	private float hours;

	@Column()
	private float cost;

	@ManyToOne
	@JoinColumn(name = "guide_id", nullable = false)
	private TourGuideEntity tourGuide;

	@ManyToOne
	@JoinColumn(name = "plan_id", nullable = false)
	private PlanEntity plan;

	public TransactionEntity() { }

	public TransactionEntity(float hours, float cost) {
		this.hours = hours;
		this.cost = cost;
	}

	public TransactionEntity(Integer id, float hours, float cost) {
		this.id = id;
		this.hours = hours;
		this.cost = cost;
	}

	public Integer getId() { return id; }

	public void setId(Integer id) { this.id = id; }

	public float getHours() { return hours; }

	public void setHours(float hours) { this.hours = hours; }

	public float getCost() { return cost; }

	public void setCost(float cost) { this.cost = cost; }

	public TourGuideEntity getTourGuide() { return tourGuide; }

	public void setTourGuide(TourGuideEntity tourGuide) { this.tourGuide = tourGuide; }

	public PlanEntity getPlan() { return plan; }

	public void setPlan(PlanEntity plan) { this.plan = plan; }

}
