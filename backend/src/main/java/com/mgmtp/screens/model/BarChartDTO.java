package com.mgmtp.screens.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;

public class BarChartDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonProperty("name")
	private final String name;

	@JsonProperty("value")
	private final float totalCost;

	public BarChartDTO(@JsonProperty("name") String name, @JsonProperty("value") float totalCost) {
		this.name = name;
		this.totalCost = totalCost;
	}

	public String getName() { return name; }

	public float getTotalCost() { return totalCost; }

}
