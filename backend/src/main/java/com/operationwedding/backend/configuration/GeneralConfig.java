package com.operationwedding.backend.configuration;

import javax.sql.DataSource;

import org.flywaydb.core.Flyway;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GeneralConfig {
	// I have to make a bean manually because, in this Spring Boot version, the Flyway 
	// dependency doesn't inicialize automatically.
	@Bean
	public Flyway flyway(DataSource dataSource) {
	    Flyway flyway = Flyway.configure()
	        .dataSource(dataSource)
	        .locations("classpath:db/migration")
	        .baselineOnMigrate(true)
	        .load();
	    
	    flyway.migrate();
	    return flyway;
	}
}
