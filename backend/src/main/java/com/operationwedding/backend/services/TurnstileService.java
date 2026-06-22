package com.operationwedding.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import tools.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.operationwedding.backend.controller.GuestController;

@Service
public class TurnstileService {
    @Value("${cloudflare.turnstile.secret-key}")
    private String secretKey;
    private String url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    @Autowired
    private RestTemplate restTemplate;

    private static final Logger log = LoggerFactory.getLogger(GuestController.class);

    @Autowired
	private ObjectMapper objectMapper; 

    public boolean isHuman(String token, String remoteip) {
        if(token == null || token.isEmpty()) throw new IllegalArgumentException("Token captcha não informado");
        
        HttpHeaders headers = new HttpHeaders();
        
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("secret", secretKey);
        params.add("response", token);
        if (remoteip != null) {
            params.add("remoteip", remoteip);
        }

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<TurnstileResponse> response = restTemplate.postForEntity(
                url, request, TurnstileResponse.class);

                log.warn("turnstile: {}", objectMapper.writeValueAsString(response.getBody()));

            return response.getBody() != null && response.getBody().isSuccess();
        } catch (Exception e) {
            TurnstileResponse errorResponse = new TurnstileResponse();
            errorResponse.setSuccess(false);
            errorResponse.setErrorCodes(List.of("internal-error"));
            log.error("turnstile: {}", e.getMessage(), e);

            return false;
        }

    }
    public static class TurnstileResponse {
        private boolean success;
        @JsonProperty("error-codes")
        private List<String> errorCodes;

        
        public List<String> getErrorCodes() {
            return errorCodes;
        }
        public void setErrorCodes(List<String> errorCodes) {
            this.errorCodes = errorCodes;
        }
        public boolean isSuccess() {
            return success;
        }
        public void setSuccess(boolean success) {
            this.success = success;
        }
        
    }
}
