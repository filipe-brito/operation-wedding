package com.operationwedding.backend.services;

import java.time.Duration;

import org.springframework.stereotype.Service;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;

import io.github.bucket4j.Bucket;

@Service
public class RateLimiterService {
		
	
	// Caffeine is a high-performance in-memory cache for concurrent access
    private final Cache<String, Bucket> cache = Caffeine.newBuilder()
            .expireAfterAccess(Duration.ofMinutes(15)) // Expiration time to clean the access historic
            .maximumSize(1_000) // max of 1000 different ips in memory
            .build();

    /*
     * This method is called by the Filter to retrieve the Bucket for a specific IP.
     * cache.get() looks up the IP in the cache; if not found, it computes 
     * and stores a new Bucket automatically (atomic operation).
     */
	public Bucket resolveBucket(String ip) {
        return cache.get(ip, key -> newBucket());
    }
	
	/*
	 * Method to create a new Bucket
	 * .capacity(10) means that each ip must have a max of 10 tokens in memory
	 * .refillIntervally(10, Duration.ofMinutes(1))) defines that 10 tokens 
	 * will be replenished every 1 minute
	 */
    private Bucket newBucket() {
        return Bucket.builder()
            .addLimit(limit -> limit
                .capacity(10)
                .refillIntervally(10, Duration.ofMinutes(1)))
            .build();
    }
}