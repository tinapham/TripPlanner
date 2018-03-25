package com.mgmtp.screens.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mgmtp.screens.entity.AttractionEntity;
import java.io.Serializable;

public class AttractionDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private Integer id;

	private final String name;

	private final String address;

	private final double lat;

	private final double lng;

	private final String type;

	private final String description;

	public AttractionDTO(@JsonProperty("id") Integer id, @JsonProperty("name") String name,
					 @JsonProperty("address") String address, @JsonProperty("lat") double lat,
					 @JsonProperty("lng") double lng, @JsonProperty("type") String type,
					 @JsonProperty("description") String description) {

		this.id = id;
		this.name = name;
		this.address = address;
		this.lat = lat;
		this.lng = lng;
		this.type = type;
		this.description = description;
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

	public static AttractionDTO fromEntity(AttractionEntity AttractionEntity) {
		return new AttractionDTO(null, AttractionEntity.getName(), AttractionEntity.getAddress(),
								AttractionEntity.getLat(), AttractionEntity.getLng(),
								AttractionEntity.getType(), AttractionEntity.getDescription());
	}

	public static AttractionDTO fromEntityByAdmin(AttractionEntity attractionEntity) {
		return new AttractionDTO(attractionEntity.getId(), attractionEntity.getName(), attractionEntity.getAddress(),
				attractionEntity.getLat(), attractionEntity.getLng(),
				attractionEntity.getType(), attractionEntity.getDescription());
	}

}
