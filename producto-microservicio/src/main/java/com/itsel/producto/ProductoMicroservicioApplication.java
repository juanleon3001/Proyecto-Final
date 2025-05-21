package com.itsel.producto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

//@EnableFeignClient
@SpringBootApplication(scanBasePackages = {"com.itsel.producto", "com.itsel.common.controllers"})
@EntityScan({"com.itsel.common.models.entities"})
public class ProductoMicroservicioApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductoMicroservicioApplication.class, args);
	}

}
