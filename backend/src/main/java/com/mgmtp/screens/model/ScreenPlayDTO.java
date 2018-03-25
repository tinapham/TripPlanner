package com.mgmtp.screens.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mgmtp.screens.entity.ScreenEntity;
import com.mgmtp.screens.entity.ScreenPlayEntity;

public class ScreenPlayDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private Integer id;

	private final String name;

	@JsonProperty("display-time")
	private final int displayTime;

	private final List<ScreenDTO> screens;

	public ScreenPlayDTO(@JsonProperty("id") Integer id, @JsonProperty("name") String name,
			@JsonProperty("display-time") int displayTime, @JsonProperty("screens") List<ScreenDTO> screens) {
		this.id = id;
		this.name = name;
		this.displayTime = displayTime;
		this.screens = screens;
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

	public List<ScreenDTO> getScreens() {
		return screens;
	}

	public static ScreenPlayDTO fromEntity(ScreenPlayEntity screenPlayEntity) {
		List<ScreenDTO> screens = new ArrayList<>();
		for (ScreenEntity item : screenPlayEntity.getScreens()) {
			screens.add(ScreenDTO.fromEntity(item));
		}
		return new ScreenPlayDTO(null, screenPlayEntity.getName(), screenPlayEntity.getDisplayTime(), screens);
	}

	public static ScreenPlayDTO fromEntityByAdmin(ScreenPlayEntity screenPlayEntity) {
		List<ScreenDTO> screens = new ArrayList<>();
		for (ScreenEntity item : screenPlayEntity.getScreens()) {
			screens.add(ScreenDTO.fromEntityByAdmin(item));
		}
		return new ScreenPlayDTO(screenPlayEntity.getId(), screenPlayEntity.getName(),
				screenPlayEntity.getDisplayTime(), screens);
	}

}
