package com.operationwedding.backend.exception;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.model.mapper.PaymentMapper;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(ResponseStatusException.class)
	public ResponseEntity<ProblemDetail> handleResponseStatusException(ResponseStatusException ex) {
	    ProblemDetail problem = ProblemDetail.forStatusAndDetail(ex.getStatusCode(), ex.getReason());
	    return ResponseEntity.status(ex.getStatusCode()).body(problem);
	}

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<ProblemDetail> handleConstraintException(ConstraintViolationException e) {

		Map<String, String> errors = new HashMap<>();
		e.getConstraintViolations().forEach(violation -> {
			// Extrai o nome do campo (ex: salvarConvidado.convidado.email -> email)
			String fieldName = violation.getPropertyPath().toString();
			errors.put(fieldName, violation.getMessage());
		});

		ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
		problem.setTitle("Erro de integridade");
		problem.setProperty("fields", errors);

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(problem);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ProblemDetail> handleValidationExceptions(MethodArgumentNotValidException e) {
		Map<String, List<String>> errors = new HashMap<>();

		e.getBindingResult().getFieldErrors().forEach(error -> {
			errors.computeIfAbsent(error.getField(), k -> new ArrayList<>()).add(error.getDefaultMessage());
		});

		ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST,
				"Um ou mais campos estão inválidos");
		problem.setTitle("Erro de validação");
		problem.setProperty("fields", errors);

		return ResponseEntity.badRequest().body(problem);
	}

	@ExceptionHandler(MPPaymentException.class)
	public ResponseEntity<ProblemDetail> handleMPPaymentException(MPPaymentException ex) {
		ProblemDetail problem = ProblemDetail.forStatusAndDetail(ex.getStatus(),
				"Falha ao processar pagamento no Mercado Pago");

		if (ex.getBody() != null) {
			PaymentResponseDTO response = PaymentMapper.toPaymentResponse(ex.getBody());
			problem.setProperty("mp_error_data", response);
		};

		return ResponseEntity.status(ex.getStatus()).body(problem);
	}

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<ProblemDetail> handleEntityNotFound(EntityNotFoundException e) {
		ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(problem);
	}

	@ExceptionHandler(IllegalStateException.class)
	public ResponseEntity<ProblemDetail> handleIllegalException(IllegalStateException e) {
		ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());

		return ResponseEntity.status(HttpStatus.CONFLICT).body(problem);
	}
}
