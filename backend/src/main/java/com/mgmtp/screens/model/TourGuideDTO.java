package com.mgmtp.screens.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mgmtp.screens.entity.PlanEntity;
import com.mgmtp.screens.entity.TourGuideEntity;
import com.mgmtp.screens.entity.UserEntity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class TourGuideDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Integer id;

    private final String name;

    private String experience;

    private float price;

    private String description;

    private TourGuideDTO(@JsonProperty("id") Integer id, @JsonProperty("name") String name,
                         @JsonProperty("experience") String experience, @JsonProperty("price") float price,
                         @JsonProperty("description") String description) {
        this.id = id;
        this.name = name;
        this.experience = experience;
        this.price = price;
        this.description = description;
    }

    public Integer getId() { return id; }

    public String getName() { return name; }

    public String getExperience() { return experience; }

    public float getPrice() { return price; }

    public String getDescription() { return description; }

    public static TourGuideDTO fromEntity(TourGuideEntity tourGuideEntity) {
//        List<PlanDTO> plans = new ArrayList<>();
//        for (PlanEntity item : tourGuideEntity.getPlans()) {
//            plans.add(PlanDTO.fromEntityByAdmin(item));
//        }
        return new TourGuideDTO(tourGuideEntity.getId(), tourGuideEntity.getName(), tourGuideEntity.getExperience() ,
                                tourGuideEntity.getPrice(), tourGuideEntity.getDescription());
    }
}
