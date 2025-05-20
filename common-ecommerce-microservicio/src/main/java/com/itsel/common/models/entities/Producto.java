package com.itsel.common.models.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "PRODUCTOS")
public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PRODUCTOS_SEQ")
    @SequenceGenerator(name = "PRODUCTOS_SEQ", sequenceName = "PRODUCTOS_SEQ", allocationSize = 1)
    @Column(name = "ID_PRODUCTO")
    private Long id;
    
    @Column(name = "NOMBRE")
    private String nombre;
    
    @Column(name = "DESCRIPCION", columnDefinition = "CLOB")
    private String descripcion;
    
    @Column(name = "PRECIO")
    private Double precio;
    
    @Column(name = "STOCK")
    private Integer stock;
    
    @ManyToMany(mappedBy = "productos", cascade = CascadeType.MERGE)
    private List<Pedido> pedidos;

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

    public List<Pedido> getPedidos() {
        return pedidos;
    }

    public void setPedidos(List<Pedido> pedidos) {
        this.pedidos = pedidos;
    }
}