package com.itsel.cliente;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;




@SpringBootApplication(scanBasePackages = {"com.itsel.common.controllers", "com.itsel.cliente"})
@EntityScan({"com.itsel.common.models.entities"})
public class ClienteMicroservicioApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClienteMicroservicioApplication.class, args);
	}

}
