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
	private float days;

	@Column()
	private float cost;

	@Column()
	private boolean paid;

	@ManyToOne
	@JoinColumn(name = "guide_id", nullable = false)
	private TourGuideEntity tourGuide;

	@OneToOne
	@JoinColumn(name = "plan_id", nullable = false)
	private PlanEntity plan;

	public TransactionEntity() { }

	public TransactionEntity(float hours, float cost) {
		this.days = days;
		this.cost = cost;
	}

	public TransactionEntity(Integer id, float days, float cost) {
		this.id = id;
		this.days = days;
		this.cost = cost;
	}

	public Integer getId() { return id; }

	public void setId(Integer id) { this.id = id; }

	public float getDays() { return days; }

	public void setDays(float hours) { this.days = days; }

	public float getCost() { return cost; }

	public void setCost(float cost) { this.cost = cost; }

	public TourGuideEntity getTourGuide() { return tourGuide; }

	public void setTourGuide(TourGuideEntity tourGuide) { this.tourGuide = tourGuide; }

	public PlanEntity getPlan() { return plan; }

	public void setPlan(PlanEntity plan) { this.plan = plan; }

	public boolean isPaid() { return paid; }

	public void setPaid(boolean paid) { this.paid = paid; }

}
