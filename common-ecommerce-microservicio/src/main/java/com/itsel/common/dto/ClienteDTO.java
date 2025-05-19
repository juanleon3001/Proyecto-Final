package com.itsel.common.dto;

import jakarta.validation.constraints.NotBlank;

public class ClienteDTO {
	
private Long id;
	
	@NotBlank(message = "El nombre no puede estar en blanco")
	private  String nombre;
	
	@NotBlank(message = "El apellido no puede estar en blanco")
	private  String apeliido;
	
	@NotBlank(message = "El email no puede estar en blanco")
	private  String email;
	
	@NotBlank(message = "El telefono no puede estar en blanco")
	private  String telefono;
	
	@NotBlank(message = "La direccion no puede estar en blanco")
	private  String direccion;

}
