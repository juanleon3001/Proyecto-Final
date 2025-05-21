package com.itsel.pedido.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.itsel.common.dto.PedidoDTO;
import com.itsel.common.dto.PedidoDTOGet;
import com.itsel.common.dto.ProductoDTOGet;
import com.itsel.common.mappers.CommonEcommerceMapper;
import com.itsel.common.models.entities.Pedido;
import com.itsel.common.models.entities.Producto;
import com.itsel.pedido.models.repository.PedidoRepository;

@Component
public class PedidoMapper extends CommonEcommerceMapper<PedidoDTO, Pedido, PedidoRepository> {

    @Override
    public PedidoDTO entityToDTO(Pedido entity) {
        if (entity == null) return null;
        
        PedidoDTO dto = new PedidoDTO();
        dto.setId(entity.getId());
        dto.setIdCliente(entity.getCliente().getId());
        dto.setTotal(entity.getTotal());
        dto.setFechaCreacion(entity.getFechaCreacion());
        dto.setIdEstado(entity.getEstado().getId());
        
        if (entity.getProductos() != null) {
            List<Long> idProductos = entity.getProductos().stream()
                .map(Producto::getId)
                .collect(Collectors.toList());
            dto.setIdProductos(idProductos);
        }
        
        return dto;
    }

    public PedidoDTOGet entityToDTOGet(Pedido entity) {
        if (entity == null) return null;
        
        PedidoDTOGet dto = new PedidoDTOGet();
        dto.setId(entity.getId());
        dto.setClienteNombre(entity.getCliente().getNombre());
        dto.setClienteApellido(entity.getCliente().getApellido());
        dto.setTotal(entity.getTotal());
        dto.setFechaCreacion(entity.getFechaCreacion());
        dto.setEstado(entity.getEstado().getNombre());
        
        if (entity.getProductos() != null) {
            List<ProductoDTOGet> productos = entity.getProductos().stream()
                .map(producto -> {
                    ProductoDTOGet productoDTO = new ProductoDTOGet();
                    productoDTO.setId(producto.getId());
                    productoDTO.setNombre(producto.getNombre());
                    productoDTO.setDescripcion(producto.getDescripcion());
                    productoDTO.setPrecio(producto.getPrecio());
                    productoDTO.setStock(producto.getStock());
                    return productoDTO;
                })
                .collect(Collectors.toList());
            dto.setProductos(productos);
        }
        
        return dto;
    }

    @Override
    public Pedido dtoToEntity(PedidoDTO dto) {
        if (dto == null) return null;
        
        Pedido entity = new Pedido();
        entity.setId(dto.getId());
        entity.setTotal(dto.getTotal());
        entity.setFechaCreacion(dto.getFechaCreacion());
        
        return entity;
    }
}