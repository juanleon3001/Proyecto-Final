package com.itsel.common.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ClienteDTO {
	
private Long id;
	
	@NotNull(message = "El nombre no puede ser nulo")
	@NotBlank(message = "El nombre no puede estar en blanco")
	private  String nombre;
	
	@NotNull(message = "El apellido no puede ser nulo")
	@NotBlank(message = "El apellido no puede estar en blanco")
	private  String apellido;
	
	@NotNull(message = "El email no puede ser nulo")
    @NotBlank(message = "El email no puede estar en blanco")
    @Email(message = "El email debe tener un formato válido (ejemplo@dominio.com)")
	private  String email;
	
	@NotNull(message = "El teléfono no puede ser nulo")
    @NotBlank(message = "El teléfono no puede estar en blanco")
    @Pattern(regexp = "^[0-9]{10}$", message = "El teléfono debe tener exactamente 10 dígitos numéricos")
	private  String telefono;
	
	
	@Size(max = 100, message = "La dirección no debe exceder los 100 caracteres")
	private  String direccion;


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


	public String getApellido() {
		return apellido;
	}


	public void setApellido(String apellido) {
		this.apellido = apellido;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getTelefono() {
		return telefono;
	}


	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}


	public String getDireccion() {
		return direccion;
	}


	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	
	

}
