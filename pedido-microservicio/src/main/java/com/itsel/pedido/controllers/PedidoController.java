package com.itsel.pedido.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import com.itsel.pedido.services.PedidoService;
import com.itsel.common.controllers.CommonEcommerceController;
import com.itsel.common.dto.PedidoDTO;
import java.util.List;

@RestController
public class PedidoController extends CommonEcommerceController<PedidoDTO, PedidoService> {
    
    public PedidoController(PedidoService service) {
        super(service);
    }

    @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<List<PedidoDTO>> obtenerPorCliente(@PathVariable Long idCliente) {
        List<PedidoDTO> pedidos = service.listarPorCliente(idCliente);
        return ResponseEntity.ok(pedidos);
    }
}