package com.mgmtp.screens.repository;

import com.mgmtp.screens.entity.AttractionEntity;
import com.mgmtp.screens.entity.FavoriteEntity;
import com.mgmtp.screens.entity.TypeEntity;
import com.mgmtp.screens.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteDAO extends JpaRepository<FavoriteEntity, Integer> {

    List<FavoriteEntity> getFavoriteEntitiesByUser (UserEntity userEntity);

    FavoriteEntity getFavoriteEntityByUserAndAttraction (UserEntity userEntity, AttractionEntity attractionEntity);

}
