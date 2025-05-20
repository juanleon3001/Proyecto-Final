package com.itsel.common.models.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Table(name = "PRODUCTO")
@Entity
public class Producto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PRODUCTO_SEQ")
	@SequenceGenerator(name = "PRODUCTO_SEQ", sequenceName = "PRODUCTO_SEQ", allocationSize = 1)
	@Column(name = "ID_PRODUCTO")
	private Long id;
	
	@Column(name = "NOMBRE")
	private  String nombre;
	
	@Column(name = "DESCRIPCION")
	private  String descripcion;
	
	@Column(name = "PRECIO")
	private  Long precio;
	
	@Column(name = "STOCK")
	private  Long stock;
	
	@ManyToMany
	(cascade = CascadeType.MERGE)
	private  List<Pedido> pedidos;

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

	public Long getPrecio() {
		return precio;
	}

	public void setPrecio(Long precio) {
		this.precio = precio;
	}

	public Long getStock() {
		return stock;
	}

	public void setStock(Long stock) {
		this.stock = stock;
	}

	public List<Pedido> getPedidos() {
		return pedidos;
	}

	public void setPedidos(List<Pedido> pedidos) {
		this.pedidos = pedidos;
	}
	
	
	

}
