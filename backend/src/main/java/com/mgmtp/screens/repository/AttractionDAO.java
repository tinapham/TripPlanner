package com.mgmtp.screens.repository;

import com.mgmtp.screens.entity.AttractionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface AttractionDAO extends JpaRepository<AttractionEntity, Integer> {

    AttractionEntity getAttractionEntityByName(@Param("name") String name);

}
