package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.UserEntity;
import com.mgmtp.screens.model.UpdatingUserDTO;
import com.mgmtp.screens.model.UserDTO;
import com.mgmtp.screens.repository.UserDAO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.mgmtp.screens.constant.SecurityConstants.SECRET;

@Service()
public class UserServiceImpl implements UserService {

    private UserDAO userDAO;

    @Autowired
    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Override
    public boolean isExist(String email) {
        return (userDAO.getUserEntityByEmail(email) != null);
    }

    @Override
    public boolean isAdmin(String email) {
        try {
            return userDAO.getUserEntityByEmail(email).isAdmin();
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<UserDTO> findAll() {
        List<UserEntity> list = userDAO.findAll();
        if (list == null) {
            return null;
        }
        List<UserDTO> screenPlays = new ArrayList<>();
        for (UserEntity item : list) {
            screenPlays.add(UserDTO.fromEntity(item));
        }
        return screenPlays;
    }

    @Override
    public UserEntity getUserEntity(String email) {
        return userDAO.getUserEntityByEmail(email);
    }

    @Override
    public String getAccessToken(UserDTO userDto, Date expireAt) {
        try {
            UserEntity user = userDAO.getUserEntityByEmailAndPassword(userDto.getEmail(), userDto.getPassword());
            if (user != null) {
                return Jwts.builder()
                        .setSubject(user.getEmail())
                        .setExpiration(expireAt)
                        .signWith(SignatureAlgorithm.HS256, SECRET.getBytes())
                        .compact();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    @Override
    public boolean addUser(UserDTO userDTO) {
        try {
            UserEntity userEntity = new UserEntity(userDTO.getEmail(), userDTO.getPassword());
            userDAO.save(userEntity);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    @Transactional
    public boolean updateUser(UpdatingUserDTO updatingUserDTO) {
        try {
            UserEntity userEntity = userDAO.getUserEntityByEmailAndPassword(updatingUserDTO.getEmail(), updatingUserDTO.getPassword());
            userEntity.setPassword(updatingUserDTO.getNewPassword());
            userDAO.save(userEntity);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteById(Integer id) {
        try {
            if(userDAO.getOne(id).isAdmin()) return false;
            userDAO.delete(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
