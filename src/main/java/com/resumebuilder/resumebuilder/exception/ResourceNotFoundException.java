package com.resumebuilder.resumebuilder.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
    public ResourceNotFoundException(String message1, String message2) {
        super(message1 + message2);
    }
}