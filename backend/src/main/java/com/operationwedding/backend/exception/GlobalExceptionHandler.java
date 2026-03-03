package com.operationwedding.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpStatusCodeException;

import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.model.mapper.PaymentMapper;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpStatusCodeException.class)
    public ResponseEntity<Object> handleMP(HttpStatusCodeException e) {
        // Aqui você propaga o erro de forma elegante
        return ResponseEntity.status(e.getStatusCode()).body("Erro de integração: " + e.getResponseBodyAsString());
    }
    
    @ExceptionHandler(MPPaymentException.class)
    public ResponseEntity<PaymentResponseDTO> handleMPPaymentException(MPPaymentException ex) {
        // O Spring pega o 'body' (seu DTO) e o 'status' e envia para o Axios
    	System.out.println("Exceção escapando do código");
    	PaymentResponseDTO response = PaymentMapper.toPaymentResponse(ex.getBody());
        return ResponseEntity.status(ex.getStatus()).body(response);
    }
}
