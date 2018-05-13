package com.mgmtp.screens.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mgmtp.screens.entity.AttractionEntity;
import java.io.Serializable;

public class AttractionDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private Integer id;

	private String name;

	private String address;

	private double lat;

	private double lng;

	private String type;

	private String description;

	@JsonProperty("favorite")
	private FavoriteDTO favorite;

	public AttractionDTO() {
		this.lat = 0;
		this.lng = 0;
	}

	private AttractionDTO(@JsonProperty("id") Integer id, @JsonProperty("name") String name,
						  @JsonProperty("address") String address, @JsonProperty("lat") double lat,
						  @JsonProperty("lng") double lng, @JsonProperty("type") String type,
						  @JsonProperty("description") String description, @JsonProperty("favorite") FavoriteDTO favorite) {

		this.id = id;
		this.name = name;
		this.address = address;
		this.lat = lat;
		this.lng = lng;
		this.type = type;
		this.description = description;
		this.favorite = favorite;
	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getAddress() { return address; }

	public double getLat() { return lat; }

	public double getLng() { return lng; }

	public String getType() { return type; }

	public String getDescription() { return description; }

	public void setId(Integer id) { this.id = id; }

	public void setName(String name) { this.name = name; }

	public void setAddress(String address) { this.address = address; }

	public void setLat(double lat) { this.lat = lat; }

	public void setLng(double lng) { this.lng = lng; }

	public void setType(String type) { this.type = type; }

	public void setDescription(String description) { this.description = description; }

	public void setFavorite(FavoriteDTO favorite) { this.favorite = favorite; }

	public static AttractionDTO fromEntityByAdmin(AttractionEntity attractionEntity) {
		return new AttractionDTO(attractionEntity.getId(), attractionEntity.getName(), attractionEntity.getAddress(),
				attractionEntity.getLat(), attractionEntity.getLng(),
				attractionEntity.getType().getName(), attractionEntity.getDescription(), null);
	}

}
