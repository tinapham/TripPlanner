package com.mgmtp.screens.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "type")
public class TypeEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column()
	private Integer id;

	@Column()
	private String name;

	@OneToMany(mappedBy = "type", cascade = CascadeType.ALL)
	private List<AttractionEntity> attractions;

	public TypeEntity() { }

	public TypeEntity(String name) {
		this.name = name;
	}

	public TypeEntity(Integer id, String name, List<AttractionEntity> attractions) {
		this.id = id;
		this.name = name;
		this.attractions = attractions;
	}

	public Integer getId() { return id; }

	public void setId(Integer id) { this.id = id; }

	public String getName() { return name; }

	public void setName(String name) { this.name = name; }

	public List<AttractionEntity> getAttraction() { return attractions; }

	public void setAttraction(List<AttractionEntity> attractions) { this.attractions = attractions; }

}
