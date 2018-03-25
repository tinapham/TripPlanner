package com.mgmtp.screens.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mgmtp.screens.entity.AppEntity;
import com.mgmtp.screens.entity.ParameterEntity;

public class AppDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private Integer id;

	private final String type;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	@JsonProperty("parameters")
	private List<Map<String, String>> adminParams;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	@JsonProperty("params")
	private Map<String, String> userParams;

	public AppDTO(String type, Map<String, String> userParams) {
		this.type = type;
		this.userParams = userParams;
	}

	public AppDTO(@JsonProperty("id") Integer id, @JsonProperty("type") String type,
			@JsonProperty("parameters") List<Map<String, String>> adminParams) {
		this.id = id;
		this.type = type;
		this.adminParams = adminParams;
	}

	public Integer getId() {
		return id;
	}

	public String getType() {
		return type;
	}

	public List<Map<String, String>> getAdminParams() {
		return adminParams;
	}

	public Map<String, String> getUserParams() {
		return userParams;
	}

	public static AppDTO fromEntity(AppEntity input) {
		Map<String, String> params = new HashMap<>();
		for (ParameterEntity item : input.getParameters()) {
			params.put(item.getKey(), item.getValue());
		}
		return new AppDTO(input.getType(), params);
	}

	public static AppDTO fromEntityByAdmin(AppEntity input) {
		List<Map<String, String>> parameters = new ArrayList<>();
		for (ParameterEntity item : input.getParameters()) {
			Map<String, String> param = new HashMap<>();
			param.put("id", item.getId().toString());
			param.put("key", item.getKey());
			param.put("value", item.getValue());
			parameters.add(param);
		}
		return new AppDTO(input.getId(), input.getType(), parameters);
	}

}
