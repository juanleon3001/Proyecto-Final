package com.itsel.pedido.services;

import com.itsel.common.dto.PedidoDTO;
import com.itsel.common.services.CommonEcommerceService;
import java.util.List;

public interface PedidoService extends CommonEcommerceService<PedidoDTO> {
    List<PedidoDTO> listarPorCliente(Long idCliente);
}