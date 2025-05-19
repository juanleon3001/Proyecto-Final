package com.itsel.cliente.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.itsel.aerolinea.services.AerolineaService;
import com.itsel.common.controllers.CommonAeroController;
import com.itsel.common.dto.AerolineaDTO;

@RestController
public class ClienteController extends CommonAeroController<ClienteDTO, CLienteService> {
	
	public ClienteController(ClienteService service) {
		super(service);
	}

}
