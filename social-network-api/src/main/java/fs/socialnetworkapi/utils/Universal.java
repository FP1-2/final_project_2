package fs.socialnetworkapi.utils;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Universal {

  public static String convert(LocalDateTime createdDate) {
    LocalDateTime now = LocalDateTime.now();
    String timeWhenWasPost;
    Duration duration = Duration.between(createdDate, now);

    if (duration.toMinutes() < 60) {
      timeWhenWasPost = createdDate.format(DateTimeFormatter.ofPattern("h:mm a",Locale.ENGLISH));
    } else if (duration.toDays() < 1) {
      long hours = duration.toHours();
      timeWhenWasPost = String.format("%d %s ago",hours, (hours == 1 ? "hour" : "hours"));
    } else {
      timeWhenWasPost = createdDate.format(DateTimeFormatter.ofPattern("dd MMM yyyy", Locale.ENGLISH));
    }

    return timeWhenWasPost;
  }
}
