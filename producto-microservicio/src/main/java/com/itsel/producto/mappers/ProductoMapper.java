package com.itsel.producto.mappers;

import org.springframework.stereotype.Component;

@Component
public class ProductoMapper extends CommonEcommerceMapper<ProductoDTO, Producto, ProductoRepository> {

	@Override
	public ProductoDTO entityToDTO(Producto entity) {
		if (entity != null) {
			ProductoDTO dto = new ProductoDTO();
			dto.setId(entity.getId());
			dto.setNombre(entity.getNombre());
			dto.setDescripcion(entity.getDescripcion());
			dto.setPrecio(entity.getPrecio());
			dto.setStock(entity.getStock());
			return dto;
		}
		return null;
	}
	
	@Override
	public Producto dtoToEntity(ProductoDTO dto) {
		if (dto != null) {
			Producto entity = new Producto();
			entity.setId(dto.getId());
			entity.setNombre(dto.getNombre());
			entity.setDescripcion(dto.getDescripcion());
			entity.setPrecio(dto.getPrecio());
			entity.setStock(dto.getStock());
			return entity;
		}
		return null;
	}
}
