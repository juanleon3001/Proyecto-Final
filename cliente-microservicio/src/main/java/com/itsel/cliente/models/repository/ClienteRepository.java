package com.itsel.cliente.models.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itsel.common.models.entities.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
