package com.itsel.common.models.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Table(name = "PEDIDO")
@Entity
public class Pedido {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PEDIDO_SEQ")
	@SequenceGenerator(name = "PEDIDO_SEQ", sequenceName = "PEDIDO_SEQ", allocationSize = 1)
	@Column(name = "ID_PEDIDO")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "CLIENTE", referencedColumnName = "ID_CLIENTE")
	private  Cliente cliente;
	
	@ManyToMany
	(cascade = CascadeType.ALL)
	private  List<Producto> productos;

	@Column(name = "TOTAL")
	private  Long total;
	
	@Column(name = "FECHA_CREACION")
	private  LocalDate fechaCreacion;
	
	@Column(name = "TELEFONO")
	private  String telefono;
	
	@Column(name = "ESTADO")
	private  Long estado;
	
	public void addProducto(Producto producto){
        if(this.productos == null){
         this.productos = new ArrayList<>();
        }
     
        this.productos.add(producto);
 	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Producto> getProductos() {
		return productos;
	}

	public Long getCliente() {
		return cliente;
	}

	public void setCliente(Long cliente) {
		this.cliente = cliente;
	}

	public void setProductos(List<Producto> productos) {
		this.productos = productos;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

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
