package com.mgmtp.screens.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "screen_play")
public class ScreenPlayEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column()
	private Integer id;

	@Column(nullable = false, unique = true)
	private String name;

	@Column(name = "display_time", nullable = false)
	private int displayTime;

	@OneToMany(mappedBy = "screenPlay", cascade = CascadeType.ALL)
	private List<ScreenEntity> screens;

	@ManyToOne
	@JoinColumn(name = "users_id", nullable = false)
	private UserEntity user;

	public ScreenPlayEntity() {
	}

	public ScreenPlayEntity(String name, int displayTime) {
		this.name = name;
		this.displayTime = displayTime;
	}

	public ScreenPlayEntity(String name, int displayTime, UserEntity user) {
		this.name = name;
		this.displayTime = displayTime;
		this.user = user;
	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getDisplayTime() {
		return displayTime;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDisplayTime(int displayTime) {
		this.displayTime = displayTime;
	}

	public List<ScreenEntity> getScreens() {
		return screens;
	}

	public void setScreens(List<ScreenEntity> screens) {
		this.screens = screens;
	}

	public UserEntity getUser() { return user; }

	public void setUser(UserEntity user) { this.user = user; }
}
