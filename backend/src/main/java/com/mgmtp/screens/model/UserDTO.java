package com.mgmtp.screens.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mgmtp.screens.entity.PlanEntity;
import com.mgmtp.screens.entity.UserEntity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class UserDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Integer id;

    private final String email;

    private final String password;

    private final List<PlanDTO> plans;

    public UserDTO(@JsonProperty("id") Integer id, @JsonProperty("email") String email,
                   @JsonProperty("password") String password,
                   @JsonProperty("plans") List<PlanDTO> plans) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.plans = plans;
    }

    public Integer getId() { return id; }

    public String getEmail() { return email; }

    public String getPassword() { return password; }

    public List<PlanDTO> getPlans() { return plans; }

    public static UserDTO fromEntity(UserEntity userEntity) {
        List<PlanDTO> plans = new ArrayList<>();
        for (PlanEntity item : userEntity.getPlans()) {
            plans.add(PlanDTO.fromEntityByAdmin(item));
        }
        return new UserDTO(userEntity.getId(), userEntity.getEmail(), null , plans);
    }
}
