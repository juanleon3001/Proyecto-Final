package com.itsel.common.models.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "ESTADOS")
public class Estado {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ESTADO")
    private Long id;
    
    @Column(name = "NOMBRE", unique = true)
    private String nombre;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}