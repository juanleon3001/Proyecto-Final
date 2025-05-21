package com.itsel.pedido.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.itsel.pedido.services.PedidoService;
import com.itsel.common.controllers.CommonEcommerceController;
import com.itsel.common.dto.PedidoDTO;

@RestController
public class PedidoController extends CommonEcommerceController<PedidoDTO, PedidoService> {
    
    public PedidoController(PedidoService service) {
        super(service);
    }
}