package com.itsel.producto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EnableFeignClients
@SpringBootApplication(scanBasePackages = {"com.itsel.common.controllers", "com.itsel.producto"})
@EntityScan({"com.itsel.common.models.entities"})
public class ProductoMicroservicioApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductoMicroservicioApplication.class, args);
	}

}
