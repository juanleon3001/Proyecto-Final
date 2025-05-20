package com.itsel.cliente.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.itsel.cliente.services.ClienteService;
import com.itsel.common.dto.ClienteDTO;
import com.itsel.common.controllers.CommonEcommerceController;


@RestController
public class ClienteController extends CommonEcommerceController<ClienteDTO, ClienteService> {

	public ClienteController(ClienteService service) {
		super(service);
	}

}
