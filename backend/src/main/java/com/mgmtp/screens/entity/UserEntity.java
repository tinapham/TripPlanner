package com.mgmtp.screens.entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column()
    private Integer id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "is_admin", nullable = false)
    private boolean isAdmin;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ScreenPlayEntity> screenplays;

    public UserEntity() {}

    public UserEntity(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAdmin() { return isAdmin; }

    public void setAdmin(boolean admin) { isAdmin = admin; }

    public List<ScreenPlayEntity> getScreenPlays() { return screenplays; }

    public void setScreenPlays(List<ScreenPlayEntity> screenplays) { this.screenplays = screenplays; }

}
