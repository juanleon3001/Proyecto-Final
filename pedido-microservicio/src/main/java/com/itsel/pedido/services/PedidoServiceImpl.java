package com.itsel.pedido.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itsel.common.dto.PedidoDTO;
import com.itsel.common.models.entities.Cliente;
import com.itsel.common.models.entities.Estado;
import com.itsel.common.models.entities.Pedido;
import com.itsel.common.models.entities.Producto;
import com.itsel.common.services.CommonEcommerceServiceImpl;
import com.itsel.pedido.mappers.PedidoMapper;
import com.itsel.pedido.models.repository.PedidoRepository;

@Service
public class PedidoServiceImpl extends CommonEcommerceServiceImpl<PedidoDTO, Pedido, PedidoMapper, PedidoRepository> implements PedidoService {
    
    @Override
    @Transactional(readOnly = true)
    public List<PedidoDTO> listar() {
        List<PedidoDTO> dtos = new ArrayList<>();
        repository.findAll().forEach(pedido -> {
            dtos.add(mapper.entityToDTO(pedido));
        });
        return dtos;
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<PedidoDTO> obtenerPorId(Long id) {
        Optional<Pedido> pedido = repository.findById(id);
        if (pedido.isPresent()) {
            return Optional.of(mapper.entityToDTO(pedido.get()));
        }
        return Optional.empty();
    }
    
    @Override
    @Transactional
    public PedidoDTO editar(PedidoDTO dto, Long id) {
        Optional<Pedido> pedidoOpt = repository.findById(id);
        if (pedidoOpt.isPresent()) {
            Pedido pedido = mapper.dtoToEntity(dto);
            pedido.setId(id);
            
            // Actualizar relaciones
            actualizarRelaciones(pedido, dto);
            
            repository.save(pedido);
            return mapper.entityToDTO(pedido);
        }
        return null;
    }
    
    @Override
    @Transactional
    public PedidoDTO insertar(PedidoDTO dto) {
        Pedido pedido = mapper.dtoToEntity(dto);
        
        // Establecer relaciones
        actualizarRelaciones(pedido, dto);
        
        repository.save(pedido);
        return mapper.entityToDTO(pedido);
    }
    
    @Override
    @Transactional
    public PedidoDTO eliminar(Long id) {
        Optional<Pedido> pedido = repository.findById(id);
        if (pedido.isPresent()) {
            repository.deleteById(id);
            return mapper.entityToDTO(pedido.get());
        }
        return null;
    }
    
    private void actualizarRelaciones(Pedido pedido, PedidoDTO dto) {
        // Establecer cliente
        Cliente cliente = new Cliente();
        cliente.setId(dto.getIdCliente());
        pedido.setCliente(cliente);
        
        // Establecer estado
        Estado estado = new Estado();
        estado.setId(dto.getIdEstado());
        pedido.setEstado(estado);
        
        // Establecer productos si existen
        if (dto.getIdProductos() != null && !dto.getIdProductos().isEmpty()) {
            List<Producto> productos = dto.getIdProductos().stream()
                .map(id -> {
                    Producto p = new Producto();
                    p.setId(id);
                    return p;
                })
                .collect(Collectors.toList());
            pedido.setProductos(productos);
        }
    }
}