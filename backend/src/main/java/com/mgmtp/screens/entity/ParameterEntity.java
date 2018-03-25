package com.mgmtp.screens.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "parameter")
public class ParameterEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column()
	private Integer id;

	@Column(nullable = false)
	private String key;

	@Column(nullable = false)
	private String value;

	@ManyToOne
	@JoinColumn(name = "app_id", nullable = false)
	private AppEntity app;

	public ParameterEntity() {
	}

	public ParameterEntity(String key, String value, AppEntity app) {
		this.key = key;
		this.value = value;
		this.app = app;
	}

	public ParameterEntity(Integer id, String key, String value, AppEntity app) {
		this.id = id;
		this.key = key;
		this.value = value;
		this.app = app;
	}

	public Integer getId() {
		return id;
	}

	public String getKey() {
		return key;
	}

	public String getValue() {
		return value;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public AppEntity getApp() {
		return app;
	}

	public void setApp(AppEntity app) {
		this.app = app;
	}

}
