package com.itsel.common.mappers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

public abstract class CommonEcommerceMapper<D, E, R extends JpaRepository<E, Long>> {
	
	@Autowired
	protected R repository;
	
	protected abstract D entityToDTO(E entity);
	
	protected abstract E dtoToEntity(D dto);

}
