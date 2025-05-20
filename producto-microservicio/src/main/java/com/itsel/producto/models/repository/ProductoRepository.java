package com.itsel.producto.models.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itsel.common.models.entities.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

}
