package com.operationwedding.backend.exception;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpStatusCodeException;

import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.model.mapper.PaymentMapper;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpStatusCodeException.class)
    public ResponseEntity<Object> handleMP(HttpStatusCodeException e) {
        // Aqui você propaga o erro de forma elegante
        return ResponseEntity.status(e.getStatusCode()).body("Erro de integração: " + e.getResponseBodyAsString());
    }
    
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleConstraintException(ConstraintViolationException e) {
    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, List<String>>> handleValidationExceptions(MethodArgumentNotValidException e) {
        Map<String, List<String>> errors = new HashMap<>();
        
        e.getBindingResult().getFieldErrors().forEach(error -> {
            errors.computeIfAbsent(error.getField(), k -> new ArrayList<>())
                  .add(error.getDefaultMessage());
        });
        
        return ResponseEntity.badRequest().body(errors);
    }
    
    @ExceptionHandler(MPPaymentException.class)
    public ResponseEntity<PaymentResponseDTO> handleMPPaymentException(MPPaymentException ex) {
    	PaymentResponseDTO response = PaymentMapper.toPaymentResponse(ex.getBody());
        return ResponseEntity.status(ex.getStatus()).body(response);
    }
    
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException e) {
    	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
    
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<String> handleIllegalException(IllegalStateException e) {
    	return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
}
