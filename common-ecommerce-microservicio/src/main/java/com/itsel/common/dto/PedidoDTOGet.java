package com.itsel.common.dto;

import java.util.Date;
import java.util.List;

public class PedidoDTOGet {
    
    private Long id;
    private String clienteNombre;
    private String clienteApellido;
    private Double total;
    private Date fechaCreacion;
    private String estado;
    private List<ProductoDTOGet> productos;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClienteNombre() {
        return clienteNombre;
    }

    public void setClienteNombre(String clienteNombre) {
        this.clienteNombre = clienteNombre;
    }

    public String getClienteApellido() {
        return clienteApellido;
    }

    public void setClienteApellido(String clienteApellido) {
        this.clienteApellido = clienteApellido;
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

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public List<ProductoDTOGet> getProductos() {
        return productos;
    }

    public void setProductos(List<ProductoDTOGet> productos) {
        this.productos = productos;
    }
}