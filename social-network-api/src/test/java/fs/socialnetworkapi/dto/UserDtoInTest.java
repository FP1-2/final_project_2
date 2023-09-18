package fs.socialnetworkapi.dto;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class UserDtoInTest {

  private ValidatorFactory validatorFactory;
  private Validator validator;

  @BeforeEach
  public void setUp() {
    validatorFactory = Validation.buildDefaultValidatorFactory();
    validator = validatorFactory.getValidator();
  }

  @Test
  public void testValidUserDtoIn() {
    UserDtoIn userDtoIn = new UserDtoIn();
    userDtoIn.setFirstName("John");
    userDtoIn.setLastName("Doe");
    userDtoIn.setEmail("john@example.com");
    userDtoIn.setBirthday("1990-01-01");
    userDtoIn.setActive(true);

    Set<ConstraintViolation<UserDtoIn>> violations = validator.validate(userDtoIn);

    assertTrue(violations.isEmpty());
  }

  @Test
  public void testUserDtoInWithInvalidEmail() {
    UserDtoIn userDtoIn = new UserDtoIn();
    userDtoIn.setFirstName("John");
    userDtoIn.setLastName("Doe");
    userDtoIn.setEmail("invalid-email");
    userDtoIn.setBirthday("1990-01-01");
    userDtoIn.setActive(true);

    Set<ConstraintViolation<UserDtoIn>> violations = validator.validate(userDtoIn);

    assertFalse(violations.isEmpty());
    assertEquals(1, violations.size()); // Expecting a violation for email
  }
}