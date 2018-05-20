package com.mgmtp.screens.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mgmtp.screens.entity.EventEntity;
import com.mgmtp.screens.entity.FeedbackEntity;

import java.io.Serializable;

public class FeedbackDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private Integer id;

	@JsonProperty("created-at")
	private final String createdAt;

	@JsonProperty("content")
	private final String content;

	@JsonProperty("rating")
	private final Integer rating;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	@JsonProperty("username")
	private String username;

	public FeedbackDTO() {
		this.id = null;
		this.createdAt = "";
		this.content = "";
		this.rating = 0;
		this.username = "";
	}

	public FeedbackDTO(@JsonProperty("id") Integer id, @JsonProperty("created-at") String createdAt,
					   @JsonProperty("rating") Integer rating, @JsonProperty("content") String content,
					   @JsonProperty("username") String username) {
		this.id = id;
		this.createdAt = createdAt;
		this.content = content;
		this.rating = rating;
		this.username = username;
	}

	public Integer getId() {
		return id;
	}

	public String getCreatedAt() { return createdAt; }

	public String getContent() { return content; }

	public Integer getRating() { return rating; }

	public String getUsername() { return username; }

	public static FeedbackDTO fromEntityByAdmin(FeedbackEntity input) {
		String username = input.getUser().getEmail();
		return new FeedbackDTO(input.getId(), input.getCreatedAt(), input.getRating(), input.getContent(),
								username);
	}

}
