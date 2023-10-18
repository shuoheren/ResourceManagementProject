package com.example.UPR_Management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class UprManagementApplication {

    public static void main(String[] args) {
        System.out.println("10172023");
        SpringApplication.run(UprManagementApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // Allow all endpoints
                        .allowedOrigins("http://localhost:3000")  // Allow this origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow these HTTP methods
                        .allowCredentials(true)  // Include credentials, e.g. cookies, HTTP authentication
                        .allowedHeaders("*");  // Allow all headers
            }
        };
    }
}