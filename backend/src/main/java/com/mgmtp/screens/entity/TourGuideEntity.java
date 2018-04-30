package com.mgmtp.screens.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "tour_guides")
public class TourGuideEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column()
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column()
    private String experience;

    @Column()
    private float price;

    @Column()
    private String description;

    @OneToMany(mappedBy = "tourGuide", cascade = CascadeType.ALL)
    private List<TransactionEntity> transactions;

    public TourGuideEntity() {}

    public TourGuideEntity(String name, String experience, float price) {
        this.name = name;
        this.experience = experience;
        this.price = price;
    }

    public TourGuideEntity(String name, String experience, float price, String description,
                           List<TransactionEntity> transactions) {
        this.name = name;
        this.experience = experience;
        this.price = price;
        this.description = description;
        this.transactions = transactions;
    }

    public Integer getId() { return id; }

    public String getName() { return name; }

    public String getExperience() { return experience; }

    public float getPrice() { return price; }

    public String getDescription() { return description; }

    public List<TransactionEntity> getTransactions() { return transactions; }

    public void setId(Integer id) { this.id = id; }

    public void setName(String name) {
        this.name = name;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public void setPrice(float price) { this.price = price; }

    public void setDescription(String description) { this.description = description; }

    public void setTransactions(List<TransactionEntity> transactions) { this.transactions = transactions; }
}
