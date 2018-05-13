package com.mgmtp.screens.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mgmtp.screens.entity.EventEntity;
import com.mgmtp.screens.entity.FavoriteEntity;

import java.io.Serializable;

public class FavoriteDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonProperty("score")
	private final int score;

	@JsonProperty("choose")
	private final boolean isChoose;

	public FavoriteDTO(@JsonProperty("score") int score,
                       @JsonProperty("choose") boolean isChoose) {
		this.score = score;
		this.isChoose = isChoose;
	}

	public int getScore() { return score; }

	public boolean isChoose() { return isChoose; }

}
