package com.operationwedding.backend.configuration;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.operationwedding.backend.services.RateLimiterService;

import io.github.bucket4j.Bucket;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    @Autowired
    private RateLimiterService rateLimiterService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
            throws ServletException, IOException {
        
        String ip = request.getRemoteAddr();
        
        System.out.println("IP de origem da requisição: " + ip);

        Bucket bucket = rateLimiterService.resolveBucket(ip);

        if (bucket.tryConsume(1)) { // Tenta gastar 1 ficha
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(429);
            response.getWriter().write("Muitas requisições. Tente novamente em breve.");
        }
    }
}
