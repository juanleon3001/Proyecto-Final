package com.itsel.producto.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class ProductoServiceImpl CommonEcommerceServiceImpl<ProductoDTO, Producto, ProductoMapper, ProductoRepository> implements ProductoService{
	
	@Override
	@Transactional(readOnly = true)
	public List<ProductoDTO> listar() {
		List<ProductoDTO> dtos = new ArrayList<>();
		repository.findAll().forEach(producto -> {
		 dtos.add(mapper.entityToDTO(producto));	
		});;
		return dtos;
	}
	
	@Override
	@Transactional(readOnly = true)
	public Optional<ProductoDTO> obtenerPorId(Long id) {
		Optional<Producto> producto = repository.findById(id);
		if (producto.isPresent()) {
			return Optional.of(mapper.entityToDTO(producto.get()));
		}
		return Optional.empty();
		
	}
	
	@Override
	@Transactional
	public ProductoDTO editar(ProductoDTO dto, Long id) {
		Optional<Producto> producto = repository.findById(id);
		if (producto.isPresent()) {
			Producto productoDb = mapper.dtoToEntity(dto);
			productoDb.setId(id);
			repository.save(productoDb);
			return mapper.entityToDTO(productoDb);
		}
		return null;
	}
	
	@Override
	@Transactional
	public ProductoDTO insertar(ProductoDTO dto) {
		Producto producto = mapper.dtoToEntity(dto);
		repository.save(producto);
		return mapper.entityToDTO(producto);
	}
	
		
	@Override
	@Transactional
	public ProductoDTO eliminar(Long id) {
		Optional<Producto> producto = repository.findById(id);
		if (producto.isPresent()) {
			repository.deleteById(id);
			return mapper.entityToDTO(producto.get());
		}
		return null;
	}

}
