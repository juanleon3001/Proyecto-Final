package com.itsel.producto.mappers;

import org.springframework.stereotype.Component;

import com.itsel.common.dto.ProductoDTO;
import com.itsel.common.dto.ProductoDTOGet;
import com.itsel.common.mappers.CommonEcommerceMapper;
import com.itsel.common.models.entities.Producto;
import com.itsel.producto.models.repository.ProductoRepository;

@Component
public class ProductoMapper extends CommonEcommerceMapper<ProductoDTO, Producto, ProductoRepository> {

    // Método para ProductoDTO (create/update)
    @Override
    public ProductoDTO entityToDTO(Producto entity) {
        if (entity == null) return null;
        
        ProductoDTO dto = new ProductoDTO();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setDescripcion(entity.getDescripcion());
        dto.setPrecio(entity.getPrecio());
        dto.setStock(entity.getStock());
        return dto;
    }

    // Método para ProductoDTOGet (read)
    public ProductoDTOGet entityToDTOGet(Producto entity) {
        if (entity == null) return null;
        
        ProductoDTOGet dto = new ProductoDTOGet();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setDescripcion(entity.getDescripcion());
        dto.setPrecio(entity.getPrecio());
        dto.setStock(entity.getStock());
        return dto;
    }

    // Método para conversión inversa (usando ProductoDTO)
    @Override
    public Producto dtoToEntity(ProductoDTO dto) {
        if (dto == null) return null;
        
        Producto entity = new Producto();
        entity.setId(dto.getId());
        entity.setNombre(dto.getNombre());
        entity.setDescripcion(dto.getDescripcion());
        entity.setPrecio(dto.getPrecio());
        entity.setStock(dto.getStock());
        return entity;
    }
}