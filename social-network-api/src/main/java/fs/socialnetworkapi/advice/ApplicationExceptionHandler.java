package fs.socialnetworkapi.advice;

import fs.socialnetworkapi.exception.PostNotFoundException;
import fs.socialnetworkapi.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApplicationExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handelInvalidArgument(MethodArgumentNotValidException ex){

        Map<String, Object> errorMap = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(

                error ->{
                    errorMap.put(error.getField(),error.getDefaultMessage());
                }
        );
        return errorMap;
    }

    @ExceptionHandler(PostNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handelBusinessEx(PostNotFoundException ex){

        Map<String, Object> errorMap = new HashMap<>();

        errorMap.put("errorMessage",ex.getMessage());
        return errorMap;
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handelBusinessEx(UserNotFoundException ex){

        Map<String, Object> errorMap = new HashMap<>();

        errorMap.put("errorMessage",ex.getMessage());
        return errorMap;
    }
}
