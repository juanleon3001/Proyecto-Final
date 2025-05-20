package com.itsel.common.models.entities;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "PEDIDOS")
public class Pedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PEDIDOS_SEQ")
    @SequenceGenerator(name = "PEDIDOS_SEQ", sequenceName = "PEDIDOS_SEQ", allocationSize = 1)
    @Column(name = "ID_PEDIDO")
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "ID_CLIENTE", nullable = false)
    private Cliente cliente;
    
    @Column(name = "TOTAL")
    private Double total;
    
    @Column(name = "FECHA_CREACION")
    @Temporal(TemporalType.DATE)
    private Date fechaCreacion;
    
    @ManyToOne
    @JoinColumn(name = "ID_ESTADO", nullable = false)
    private Estado estado;
    
    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
        name = "PEDIDO_PRODUCTO",
        joinColumns = @JoinColumn(name = "ID_PEDIDO"),
        inverseJoinColumns = @JoinColumn(name = "ID_PRODUCTO")
    )
    private List<Producto> productos;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public List<Producto> getProductos() {
        return productos;
    }

    public void setProductos(List<Producto> productos) {
        this.productos = productos;
    }
}