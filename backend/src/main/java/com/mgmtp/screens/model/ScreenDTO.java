package com.mgmtp.screens.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mgmtp.screens.entity.AppEntity;
import com.mgmtp.screens.entity.ScreenEntity;

public class ScreenDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private Integer id;

	private final String type;

	@JsonProperty("animation-type")
	private final String animationType;

	private final int rows;

	private final int cols;

	private final List<AppDTO> apps;

	public ScreenDTO(@JsonProperty("id") Integer id, @JsonProperty("type") String type, @JsonProperty("animation-type") String animationType,
			@JsonProperty("rows") int rows, @JsonProperty("cols") int cols, @JsonProperty("apps") List<AppDTO> apps) {
		this.id = id;
		this.type = type;
		this.animationType = animationType;
		this.rows = rows;
		this.cols = cols;
		this.apps = apps;
	}

	public Integer getId() {
		return id;
	}

	public String getType() {
		return type;
	}

	public String getAnimationType() {
		return animationType;
	}

	public int getRows() {
		return rows;
	}

	public int getCols() {
		return cols;
	}

	public List<AppDTO> getApps() {
		return apps;
	}

	public static ScreenDTO fromEntity(ScreenEntity input) {
		List<AppDTO> apps = new ArrayList<>();
		for (AppEntity item : input.getApps()) {
			apps.add(AppDTO.fromEntity(item));
		}
		return new ScreenDTO(null, input.getType(), input.getAnimationType(), input.getRows(), input.getCols(), apps);
	}

	public static ScreenDTO fromEntityByAdmin(ScreenEntity input) {
		List<AppDTO> apps = new ArrayList<>();
		for (AppEntity item : input.getApps()) {
			apps.add(AppDTO.fromEntityByAdmin(item));
		}
		return new ScreenDTO(input.getId(), input.getType(), input.getAnimationType(), input.getRows(), input.getCols(), apps);
	}
}
