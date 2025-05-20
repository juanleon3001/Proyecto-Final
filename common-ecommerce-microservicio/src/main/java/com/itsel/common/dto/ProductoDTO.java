package com.itsel.common.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class ProductoDTO {
    
    private Long id;
    
    @NotNull(message = "El nombre no puede ser nulo")
    @NotBlank(message = "El nombre no puede estar en blanco")
    private String nombre;
    
    @NotNull(message = "La descripcion no puede ser nulo")
    @NotBlank(message = "La descripcion no puede estar en blanco")
    private String descripcion;
    
    @NotNull(message = "El precio no puede ser nulo")
    @PositiveOrZero(message = "El precio no puede ser negativo")
    private Double precio;  // Cambiado de Long a Double
    
    @NotNull(message = "El stock no puede ser nulo")
    @PositiveOrZero(message = "El stock no puede ser negativo")
    private Integer stock;  // Cambiado de Long a Integer

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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }
}