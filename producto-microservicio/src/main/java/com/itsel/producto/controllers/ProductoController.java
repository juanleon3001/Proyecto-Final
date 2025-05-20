package com.itsel.producto.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.itsel.producto.services.ProductoService;
import com.itsel.common.controllers.CommonEcommerceController;
import com.itsel.common.dto.ProductoDTO;

@RestController
public class ProductoController extends CommonEcommerceController<ProductoDTO, ProductoService> {
	
	public ProductoController(ProductoService service) {
		super(service);
	}

}
