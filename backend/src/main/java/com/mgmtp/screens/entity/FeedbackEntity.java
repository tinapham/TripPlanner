package com.mgmtp.screens.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "feedback")
public class FeedbackEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column()
	private Integer id;

	@Column(name = "created_at")
	private String createdAt;

	private String content;

	private Integer rating;

	@ManyToOne
	@JoinColumn(name = "attraction_id", nullable = false)
	private AttractionEntity attraction;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private UserEntity user;

	public FeedbackEntity() { }

	public FeedbackEntity(String createdAt, String content, Integer rating, UserEntity user, AttractionEntity attraction) {
		this.createdAt = createdAt;
		this.content = content;
		this.rating = rating;
		this.user = user;
		this.attraction = attraction;
	}

	public FeedbackEntity(Integer id, String createdAt, String content, Integer rating, UserEntity user,
						  AttractionEntity attraction) {
		this.id = id;
		this.createdAt = createdAt;
		this.content = content;
		this.rating = rating;
		this.user = user;
		this.attraction = attraction;
	}

	public Integer getId() { return id; }

	public void setId(Integer id) { this.id = id; }

	public String getCreatedAt() { return createdAt; }

	public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

	public String getContent() { return content; }

	public void setContent(String content) { this.content = content; }

	public Integer getRating() { return rating; }

	public void setRating(Integer rating) { this.rating = rating; }

	public UserEntity getUser() { return user; }

	public void setUser(UserEntity user) { this.user = user; }

	public AttractionEntity getAttraction() { return attraction; }

	public void setAttraction(AttractionEntity attraction) { this.attraction = attraction; }

}
