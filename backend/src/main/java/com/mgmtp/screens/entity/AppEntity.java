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
@Table(name = "app")
public class AppEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column()
	private Integer id;

	@Column(nullable = false)
	private String type;

	@ManyToOne
	@JoinColumn(name = "screen_id", nullable = false)
	private ScreenEntity screen;

	@OneToMany(mappedBy = "app", cascade = CascadeType.ALL)
	private List<ParameterEntity> parameters;

	public AppEntity() {
	}

	public AppEntity(Integer id, String type, ScreenEntity screen) {
		this.id = id;
		this.type = type;
		this.screen = screen;
	}

	public Integer getId() {
		return id;
	}

	public String getType() {
		return type;
	}

	public ScreenEntity getScreen() {
		return screen;
	}

	public List<ParameterEntity> getParameters() {
		return parameters;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setScreen(ScreenEntity screen) {
		this.screen = screen;
	}

	public void setParameters(List<ParameterEntity> parameters) {
		this.parameters = parameters;
	}

}
