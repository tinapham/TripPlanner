package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.UserEntity;
import com.mgmtp.screens.model.UpdatingUserDTO;
import com.mgmtp.screens.model.UserDTO;

import java.util.Date;
import java.util.List;

public interface UserService {

    boolean isExist(String email);

    boolean isAdmin(String email);

    List<UserDTO> findAll();

    UserEntity getUserEntity(String email);

    String getAccessToken(UserDTO user, Date expireAt);

    boolean addUser(UserDTO userDTO);

    boolean deleteById(Integer id);

    boolean updateUser(UpdatingUserDTO updatingUserDTO);

}
