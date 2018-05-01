package com.mgmtp.screens.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mgmtp.screens.entity.TransactionEntity;

import java.io.Serializable;

public class TransactionDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Integer id;

    @JsonProperty("days")
    private float days;

    @JsonProperty("cost")
    private float cost;

    @JsonProperty("paid")
    private boolean paid;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonProperty("tour-guide")
    private TourGuideDTO tourGuide;

    private TransactionDTO(@JsonProperty("id") Integer id, @JsonProperty("hours") float days,
                          @JsonProperty("cost") float cost, @JsonProperty("paid") boolean paid,
                          @JsonProperty("tour-guide") TourGuideDTO tourGuide) {
        this.id = id;
        this.cost = cost;
        this.days = days;
        this.paid = paid;
        this.tourGuide = tourGuide;
    }

    public Integer getId() {
        return id;
    }

    public float getDays() { return days; }

    public float getCost() { return cost; }

    public TourGuideDTO getTourGuide() { return tourGuide; }

    public boolean isPaid() { return paid; }

    public static TransactionDTO fromEntity(TransactionEntity transaction) {
        TourGuideDTO tourGuideDTO = TourGuideDTO.fromEntity(transaction.getTourGuide());
        return new TransactionDTO(transaction.getId(), transaction.getDays(), transaction.getCost(),
                                transaction.isPaid(), tourGuideDTO);
    }

}
