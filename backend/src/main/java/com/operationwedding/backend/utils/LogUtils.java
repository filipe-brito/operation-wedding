package com.operationwedding.backend.utils;

import java.util.Set;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;

import tools.jackson.databind.ObjectMapper;

public class LogUtils {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    private static final Set<String> SENSITIVE_HEADERS = Set.of(
        "Authorization", 
        "x-token", 
        "x-signature", 
        "client_secret"
    );

    public static String mask(String text) {
        if (text == null || text.isEmpty())
            return text;

        // 1. Mask E-mails (Ex: f****e@gmail.com)
        text = text.replaceAll("(\\w)[\\w\\.\\-]*@([\\w\\-]++\\.[\\w\\.\\-]++)", "$1****@$2");

        // 2. Mask CPFs/Numbers (Ex: ***.456.789-**)
        text = text.replaceAll("(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "***.$2.$3-**");
        return text;
    }

    public static String httpEntityToCurl(HttpEntity<?> entity, String method, String url) {

        
        StringBuilder curl = new StringBuilder("curl -X ");
        curl.append(method.toUpperCase()).append(" '").append(url).append("'");

        HttpHeaders headers = entity.getHeaders();
        headers.forEach((name, values) -> {
            String value;
            // Se o header for sensível, mascaramos o valor
            if (SENSITIVE_HEADERS.stream().anyMatch(h -> h.equalsIgnoreCase(name))) {
                value = generalMask(String.join(", ", values)); 
            } else {
                value = String.join(", ", values);
            }
            curl.append(" -H '").append(name).append(": ").append(value).append("'");
        });

        if (entity.getBody() != null) {
            curl.append(" -d '").append(objectMapper.writeValueAsString(entity.getBody())).append("'");
        }

        return curl.toString();
    }

    public static String generalMask(String text) {
        if (text == null || text.length() <= 6) {
            return "******"; // Proteção extra para strings muito curtas
        }
        // Retorna os 6 primeiros + máscara
        return text.substring(0, 6) + "****************";
    }
}