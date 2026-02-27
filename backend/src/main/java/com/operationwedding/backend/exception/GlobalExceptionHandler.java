package com.operationwedding.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpStatusCodeException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpStatusCodeException.class)
    public ResponseEntity<Object> handleMP(HttpStatusCodeException e) {
        // Aqui você propaga o erro de forma elegante
        return ResponseEntity.status(e.getStatusCode()).body("Erro de integração: " + e.getResponseBodyAsString());
    }
}
