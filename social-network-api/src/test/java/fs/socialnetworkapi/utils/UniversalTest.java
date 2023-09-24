package fs.socialnetworkapi.utils;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.*;

class UniversalTest {
  @Test
  public void testConvertWithinHour() {
    LocalDateTime createdDate = LocalDateTime.now().minusMinutes(30); // 30 хвилин назад
    String expected = createdDate.format(DateTimeFormatter.ofPattern("h:mm a", Locale.ENGLISH));
    String result = Universal.convert(createdDate);
    assertEquals(expected, result);
  }

  @Test
  public void testConvertWithinDay() {
    LocalDateTime createdDate = LocalDateTime.now().minusHours(2); // 2 години назад
    String expected = String.format("%d %s ago", 2, "hours");
    String result = Universal.convert(createdDate);
    assertEquals(expected, result);
  }

  @Test
  public void testConvertLongAgo() {
    LocalDateTime createdDate = LocalDateTime.now().minusDays(3); // 3 дні тому
    String expected = createdDate.format(DateTimeFormatter.ofPattern("dd MMM yyyy", Locale.ENGLISH));
    String result = Universal.convert(createdDate);
    assertEquals(expected, result);
  }
}