package com.itsel.common.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.Date;
import java.util.List;

public class PedidoDTO {
    
    private Long id;
    
    // Campos básicos
    @NotNull(message = "El cliente no puede ser nulo")
    private Long idCliente;
    
    @NotNull(message = "El total no puede ser nulo")
    @PositiveOrZero(message = "El total no puede ser negativo")
    private Double total;
    
    @NotNull(message = "La fecha de creación no puede ser nula")
    private Date fechaCreacion;
    
    @NotNull(message = "El estado no puede ser nulo")
    private Long idEstado;
    
    private List<Long> idProductos;
    
    // Campos extendidos (para consultas)
    private String clienteNombre;
    private String clienteApellido;
    private String estadoNombre;
    private List<ProductoDTOGet> productosDetalle;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
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

    public Long getIdEstado() {
        return idEstado;
    }

    public void setIdEstado(Long idEstado) {
        this.idEstado = idEstado;
    }

    public List<Long> getIdProductos() {
        return idProductos;
    }

    public void setIdProductos(List<Long> idProductos) {
        this.idProductos = idProductos;
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

    public String getEstadoNombre() {
        return estadoNombre;
    }

    public void setEstadoNombre(String estadoNombre) {
        this.estadoNombre = estadoNombre;
    }

    public List<ProductoDTOGet> getProductosDetalle() {
        return productosDetalle;
    }

    public void setProductosDetalle(List<ProductoDTOGet> productosDetalle) {
        this.productosDetalle = productosDetalle;
    }
}