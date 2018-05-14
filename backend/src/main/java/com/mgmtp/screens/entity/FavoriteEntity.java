package com.mgmtp.screens.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "favorite")
public class FavoriteEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column()
	private Integer id;

	@Column(name = "score")
	private int score;

	@Column(name = "is_user_choose")
	private boolean isUserChoose;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private UserEntity user;

	@ManyToOne
	@JoinColumn(name = "attraction_id", nullable = false)
	private AttractionEntity attraction;

	public FavoriteEntity() {}

	public FavoriteEntity(int score, boolean isUserChoose, UserEntity user, AttractionEntity attraction) {
		this.score = score;
		this.isUserChoose = isUserChoose;
		this.user = user;
		this.attraction = attraction;
	}

	public FavoriteEntity(Integer id, int score, boolean isUserChoose, UserEntity user, AttractionEntity attraction) {
		this.score = score;
		this.isUserChoose = isUserChoose;
		this.user = user;
		this.attraction = attraction;
	}

	public Integer getId() { return id; }

	public void setId(Integer id) { this.id = id; }

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public boolean isUserChoose() {
		return isUserChoose;
	}

	public void setUserChoose(boolean userChoose) {
		isUserChoose = userChoose;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public AttractionEntity getAttraction() {
		return attraction;
	}

	public void setAttraction(AttractionEntity attraction) {
		this.attraction = attraction;
	}
}
