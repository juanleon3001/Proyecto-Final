package com.itsel.pedido;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication(scanBasePackages = {"com.itsel.common.controllers", "com.itsel.pedido"})
@EntityScan({"com.itsel.common.models.entities"})
public class PedidoMicroservicioApplication {

    public static void main(String[] args) {
        SpringApplication.run(PedidoMicroservicioApplication.class, args);
    }
}