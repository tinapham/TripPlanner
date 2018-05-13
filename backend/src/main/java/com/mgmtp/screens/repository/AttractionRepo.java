package com.mgmtp.screens.repository;

import com.mgmtp.screens.entity.AttractionEntity;
import com.mgmtp.screens.entity.TransactionEntity;
import com.mgmtp.screens.entity.TypeEntity;
import com.mgmtp.screens.entity.UserEntity;
import com.mgmtp.screens.model.AttractionDTO;
import com.mgmtp.screens.model.BarChartDTO;
import com.mgmtp.screens.model.FavoriteDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class AttractionRepo {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired TypeDAO typeDAO;

    public List<AttractionDTO> getAllByUser(UserEntity userEntity) {
        List<AttractionDTO> list = new ArrayList<>();
        try {
            List<Map<String, Object>> rows = jdbcTemplate.queryForList("SELECT attractions.id, name, address," +
                    "lat, lng, type_id, description, " +
                    "CASE WHEN user_id=? THEN is_user_choose ELSE false END as is_choose, " +
                    "CASE WHEN user_id=? THEN score ELSE 0 END as score " +
                    "FROM attractions LEFT JOIN favorite ON attractions.id = attraction_id and user_id=?" +
                    "ORDER BY is_choose DESC, score DESC", userEntity.getId(), userEntity.getId(), userEntity.getId());

            for (Map row : rows) {

                AttractionDTO attraction = new AttractionDTO();
                attraction.setId(Integer.parseInt(row.get("id").toString()));
                attraction.setName(row.get("name").toString());
                attraction.setAddress(row.get("address").toString());
                attraction.setLat(Double.parseDouble(row.get("lat").toString()));
                attraction.setLng(Double.parseDouble(row.get("lng").toString()));
                attraction.setDescription(row.get("description").toString());

                //set favorite
                boolean isChoose = row.get("is_choose").toString().equals("true");
                FavoriteDTO favoriteDTO = new FavoriteDTO(Integer.parseInt(row.get("score").toString()), isChoose);
                attraction.setFavorite(favoriteDTO);

                //set type
                TypeEntity typeEntity = typeDAO.findOne(Integer.parseInt(row.get("type_id").toString()));
                attraction.setType(typeEntity.getName());

                list.add(attraction);
            }
        } catch (Exception e) {
            return null;
        }
        return list;
    }

}
