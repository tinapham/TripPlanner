package com.mgmtp.screens.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "screen")
public class ScreenEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column()
	private Integer id;

	@Column(nullable = false)
	private String type;

	@Column(name = "animation_type", nullable = false)
	private String animationType;

	@Column(nullable = false)
	private int rows;

	@Column(nullable = false)
	private int cols;

	@ManyToOne
	@JoinColumn(name = "screenplay_id", nullable = false)
	private ScreenPlayEntity screenPlay;

	@OneToMany(mappedBy = "screen", cascade = CascadeType.ALL)
	private List<AppEntity> apps;

	public ScreenEntity() {
	}

	public ScreenEntity(Integer id, String type, String animationType, int rows, int cols,
			ScreenPlayEntity screenPlay) {
		this.id = id;
		this.type = type;
		this.animationType = animationType;
		this.rows = rows;
		this.cols = cols;
		this.screenPlay = screenPlay;
	}

	public Integer getId() {
		return id;
	}

	public String getType() {
		return type;
	}

	public ScreenPlayEntity getScreenPlay() {
		return screenPlay;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setScreenPlay(ScreenPlayEntity screenPlay) {
		this.screenPlay = screenPlay;
	}

	public String getAnimationType() {
		return animationType;
	}

	public void setAnimationType(String animationType) {
		this.animationType = animationType;
	}

	public int getRows() {
		return rows;
	}

	public int getCols() {
		return cols;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public void setCols(int cols) {
		this.cols = cols;
	}

	public List<AppEntity> getApps() {
		return apps;
	}

	public void setApps(List<AppEntity> apps) {
		this.apps = apps;
	}

}
