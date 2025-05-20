package com.itsel.cliente.services;
import org.springframework.stereotype.Service;

import com.itsel.cliente.mappers.ClienteMapper;
import com.itsel.cliente.models.repository.ClienteRepository;
import com.itsel.common.dto.ClienteDTO;
import com.itsel.common.mappers.CommonEcommerceMapper;
import com.itsel.common.models.entities.Cliente;

import org.springframework.transaction.annotation.Transactional;
import com.itsel.common.services.CommonEcommerceServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteServiceImpl extends CommonEcommerceServiceImpl<ClienteDTO, Cliente, ClienteMapper, ClienteRepository>
    implements ClienteService {

    @Override
    @Transactional(readOnly = true)
    public List<ClienteDTO> listar() {
    List<ClienteDTO> dto = new ArrayList<>();
    repository.findAll().forEach(cliente -> {
        dto.add(mapper.entityToDTO(cliente));
    });
    return dto;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ClienteDTO> obtenerPorId(Long id) {
    Optional<Cliente> cliente = repository.findById(id);
    return cliente.map(mapper::entityToDTO);
    }

    @Override
    @Transactional
    public ClienteDTO editar(ClienteDTO dto, Long id) {
    Optional<Cliente> cliente = repository.findById(id);
    if (cliente.isPresent()) {
        Cliente clienteDb = mapper.dtoToEntity(dto);
        clienteDb.setId(id);
        repository.save(clienteDb);
        return mapper.entityToDTO(clienteDb);
    }
    return null;
    }

    @Override
    @Transactional
    public ClienteDTO insertar(ClienteDTO dto) {
    Cliente cliente = mapper.dtoToEntity(dto);
    repository.save(cliente);
    return mapper.entityToDTO(cliente);
    }

    @Override
    @Transactional
    public ClienteDTO eliminar(Long id) {
    Optional<Cliente> cliente = repository.findById(id);
    if (cliente.isPresent()) {
        repository.deleteById(id);
        return mapper.entityToDTO(cliente.get());
    }
    return null;
    }
}