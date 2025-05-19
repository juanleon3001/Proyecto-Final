package com.itsel.common.services;

import java.util.List;
import java.util.Optional;

public interface CommonEcommerceService<D> {
List<D> listar();
	
	Optional<D> obtenerPorId(Long id);
	
	D editar(D dto, Long id);
	
	D insertar(D dto);
	
	D eliminar(Long id);

}
