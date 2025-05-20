package com.itsel.common.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import com.itsel.common.mappers.CommonEcommerceMapper;

public class CommonEcommerceServiceImpl<D, E,
M extends CommonEcommerceMapper<D, E,R>,
R extends JpaRepository<E, Long>> implements CommonEcommerceService<D> {
	
	@Autowired
	protected R repository;
	
	@Autowired
	protected M mapper;

	@Override
	public List<D> listar() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<D> obtenerPorId(Long id) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

	@Override
	public D editar(D dto, Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public D insertar(D dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public D eliminar(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
