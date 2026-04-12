package com.bob;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
// Chỉ định nơi tìm Repository
@EnableMongoRepositories(basePackages = "com.teddy.repositories")
// Chỉ định nơi tìm Controller, Service và Model
@ComponentScan(basePackages = {"com.bob", "com.teddy"}) 
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}