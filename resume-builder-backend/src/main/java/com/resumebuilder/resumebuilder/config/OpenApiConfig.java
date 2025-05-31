package com.resumebuilder.resumebuilder.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI resumeBuilderOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Resume Builder API")
                        .description("API documentation for the Resume Builder application")
                        .version("1.0")
                        .contact(new Contact()
                                .name("Hanane Taouil")
                                .email("hanane59taouil@gmail.com")
                                .url("https://github.com/hanane54"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Local Development Server")
                ));
    }
} 