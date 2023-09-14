package fs.socialnetworkapi.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class MailServiceTest {

  @Mock
  private JavaMailSender mailSender;

  @InjectMocks
  private MailService mailService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Value("${spring.mail.sender.email:test@gmail.com}")
  private String senderEmail;

  @Test
  public void testSend() {
    String recipient = "recipient@example.com";
    String subject = "Test Subject";
    String messageText = "Test Message";

    mailService.send(recipient, subject, messageText);

    SimpleMailMessage expectedMailMessage = new SimpleMailMessage();
    expectedMailMessage.setFrom(senderEmail); // Value from properties
    expectedMailMessage.setTo(recipient);
    expectedMailMessage.setSubject(subject);
    expectedMailMessage.setText(messageText);

    verify(mailSender, times(1)).send(expectedMailMessage);
  }
}