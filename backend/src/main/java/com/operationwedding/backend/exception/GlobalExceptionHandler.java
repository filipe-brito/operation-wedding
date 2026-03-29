package com.operationwedding.backend.exception;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalExceptionHandler {
	// For general services exceptions
	@ExceptionHandler(BusinessException.class)
	public ResponseEntity<ProblemDetail> handleGenericException(BusinessException ex) {
	    ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(ex.getStatus()), ex.getMessage());
		problem.setTitle(ex.getErrorTitle());
		problem.setProperty("message", ex.getMessage());
	    return ResponseEntity.status(HttpStatus.valueOf(ex.getStatus())).body(problem);
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
