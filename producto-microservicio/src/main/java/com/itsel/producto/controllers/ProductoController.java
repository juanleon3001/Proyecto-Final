package com.itsel.producto.controllers;

import com.itsel.producto.services.ProductoService;

@RestController
public class ProductoController {
	
	public ProductoController(ProductoService service) {
		super(service);
	}

}
