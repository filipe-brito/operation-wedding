package com.operationwedding.backend.exception;

public class BusinessException extends RuntimeException{
    private int status;
    private String errorTitle;

    public BusinessException(int status, String errorTitle, String message) {
        super(message);
        this.status = status;
        this.errorTitle = errorTitle;
    }
    public int getStatus() {
        return status;
    }
    public void setStatus(int status) {
        this.status = status;
    }
    public String getErrorTitle() {
        return errorTitle;
    }
    public void setErrorTitle(String errorTitle) {
        this.errorTitle = errorTitle;
    }
}
