package com.itsel.common.models.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	
	@Column(name = "CLIENTE")
	private  String cliente;
	
	@Column(name = "TOTAL")
	private  Long total;
	
	@Column(name = "FECHA_CREACION")
	private  LocalDate fechaCreacion;
	
	@Column(name = "TELEFONO")
	private  String telefono;
	
	@Column(name = "ESTADO")
	private  String estado;

}
