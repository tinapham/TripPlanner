package com.mgmtp.screens.repository;

import com.mgmtp.screens.entity.TypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeDAO extends JpaRepository<TypeEntity, Integer> {

    TypeEntity getTypeEntityByName (String name);

}
