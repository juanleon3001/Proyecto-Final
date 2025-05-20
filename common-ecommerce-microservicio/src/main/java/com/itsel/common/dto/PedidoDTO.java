package com.itsel.common.dto;

import java.time.LocalDate;
import java.util.List;

import com.itsel.common.models.entities.Producto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

public class PedidoDTO {
	
	private  Long id;
	
	@NotNull(message = "El cliente es obligatorio")
	private  Long cliente;
	
	@NotNull(message = "Debe incluir al menos un producto")
    @Size(min = 1, message = "Debe incluir al menos un producto")
	private  List<Producto> productos;
	
	private  Long total;
	
	@NotNull(message = "La fecha de creacion no puede ser nula")
	@Past(message = "La fecha de creación debe ser anterior a la fecha actual")
	private  LocalDate fechaCreacion;
	
	@NotNull(message = "El telefono no puede ser nulo")
	private  String telefono;
	
	@NotNull(message = "El estatus no puede ser nulo")
	private  Long estado;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCliente() {
		return cliente;
	}

	public void setCliente(Long cliente) {
		this.cliente = cliente;
	}

	public List<Producto> getProductos() {
		return productos;
	}

	public void setProductos(List<Producto> productos) {
		this.productos = productos;
	}

	public Long getTotal() {
		return total;
	}

	/*public void setTotal(Long total) {
		if (productos == null) return 0L;
        return productos.stream()
               .mapToLong(p -> p.getPrecio() != null ? p.getPrecio() : 0L)
               .sum();
    }*/


	public LocalDate getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(LocalDate fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public Long getEstado() {
		return estado;
	}

	public void setEstado(Long estado) {
		this.estado = estado;
	}
	
	

}
