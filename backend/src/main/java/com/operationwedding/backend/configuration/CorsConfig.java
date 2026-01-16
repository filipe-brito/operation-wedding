package com.operationwedding.backend.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
    	System.out.println(">>> Configuração de CORS aplicada com sucesso! <<<");
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // Use o endereço do seu Vite/React
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
