package com.mgmtp.screens.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "attractions")
public class AttractionEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column()
	private Integer id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String address;

	@Column(nullable = false)
	private double lat;

	@Column(nullable = false)
	private double lng;

	@Column()
	private String type;

	@Column
	private String description;

	@OneToMany(mappedBy = "attraction", cascade = CascadeType.ALL)
	private List<EventEntity> events;

	public AttractionEntity() { }

	public AttractionEntity(String name, String address, double lat, double lng, String type, String description) {
		this.name = name;
		this.address = address;
		this.lat = lat;
		this.lng = lng;
		this.type = type;
		this.description = description;
	}

	public Integer getId() { return id; }

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLng() {
		return lng;
	}

	public void setLng(double lng) {
		this.lng = lng;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<EventEntity> getEvents() { return events; }

	public void setEvents(List<EventEntity> events) { this.events = events; }
}
