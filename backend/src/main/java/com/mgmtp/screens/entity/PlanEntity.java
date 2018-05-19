package com.mgmtp.screens.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.security.SecureRandom;
import java.util.List;

@Entity
@Table(name = "plans")
public class PlanEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private static SecureRandom random = new SecureRandom();

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

	@Column(name = "payment_token")
	private String paymentToken;

	@OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
	private List<EventEntity> events;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private UserEntity user;

	@OneToOne(mappedBy = "plan", cascade = CascadeType.ALL)
	private TransactionEntity transaction;

	public PlanEntity() { }

	public PlanEntity(String name, String startDay, String endDay, List<EventEntity> events, UserEntity user) {
		this.name = name;
		this.startDay = startDay;
		this.endDay = endDay;
		this.events = events;
		this.user = user;
		this.paymentToken = generateToken();
	}

	public PlanEntity(String name, String startDay, String endDay, List<EventEntity> events) {
		this.name = name;
		this.startDay = startDay;
		this.endDay = endDay;
		this.events = events;
		this.paymentToken = generateToken();
	}

	public PlanEntity(String name, String startDay, String endDay, List<EventEntity> events, UserEntity user,
					  TransactionEntity transaction) {
		this.name = name;
		this.startDay = startDay;
		this.endDay = endDay;
		this.events = events;
		this.user = user;
		this.transaction = transaction;
		this.paymentToken = generateToken();
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

	public TransactionEntity getTransaction() { return transaction; }

	public void setTransaction(TransactionEntity transaction) { this.transaction = transaction; }

	public String getPaymentToken() { return paymentToken; }

	private static String generateToken() {
		long longToken = Math.abs(random.nextLong());
		return Long.toString(longToken, 16);
	}

}
