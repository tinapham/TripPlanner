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

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private UserEntity user;

	@OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
	private List<TransactionEntity> transactions;

	public PlanEntity() { }

	public PlanEntity(String name, String startDay, String endDay, List<EventEntity> events, UserEntity user) {
		this.name = name;
		this.startDay = startDay;
		this.endDay = endDay;
		this.events = events;
		this.user = user;
	}

	public PlanEntity(String name, String startDay, String endDay, List<EventEntity> events) {
		this.name = name;
		this.startDay = startDay;
		this.endDay = endDay;
		this.events = events;
	}

	public PlanEntity(String name, String startDay, String endDay, List<EventEntity> events, UserEntity user,
					  List<TransactionEntity> transactions) {
		this.name = name;
		this.startDay = startDay;
		this.endDay = endDay;
		this.events = events;
		this.user = user;
		this.transactions = transactions;
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

	public UserEntity getUser() { return user; }

	public void setUser(UserEntity user) { this.user = user; }

	public List<TransactionEntity> getTransactions() { return transactions; }

	public void setTransactions(List<TransactionEntity> transactions) { this.transactions = transactions; }

}
