package com.itsel.cliente.mappers;


import org.springframework.stereotype.Component;
import com.itsel.cliente.models.repository.ClienteRepository;
import com.itsel.common.dto.ClienteDTO;
import com.itsel.common.mappers.CommonEcommerceMapper;
import com.itsel.common.models.entities.Cliente;


@Component
public class ClienteMapper extends CommonEcommerceMapper<ClienteDTO, Cliente, ClienteRepository> {

    @Override
    public ClienteDTO entityToDTO(Cliente entity) {
        if (entity != null) {
            ClienteDTO dto = new ClienteDTO();
            dto.setId(entity.getId());
            dto.setNombre(entity.getNombre());
            dto.setApellido(entity.getApellido());
            dto.setEmail(entity.getEmail());
            dto.setTelefono(entity.getTelefono());
            dto.setDireccion(entity.getDireccion());
            return dto;
        }
        return null;
    }

    @Override
    public Cliente dtoToEntity(ClienteDTO dto) {
        if (dto != null) {
            Cliente entity = new Cliente();
            entity.setNombre(dto.getNombre());
            entity.setApellido(dto.getApellido());
            entity.setEmail(dto.getEmail());
            entity.setTelefono(dto.getTelefono());
            entity.setDireccion(dto.getDireccion());
            return entity;
        }
        return null;
    }
}
