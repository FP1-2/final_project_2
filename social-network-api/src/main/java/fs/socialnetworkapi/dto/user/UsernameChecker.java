package fs.socialnetworkapi.dto.user;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UsernameChecker {

  // JDBC URL, username, and password of PostgreSQL server
  private static final String JDBC_URL = "jdbc:postgresql://db-final-project-2.cx0wpt1wnne4.us-east-1.rds.amazonaws.com:5432/twitter";
  private static final String USERNAME = "postgres";
  private static final String PASSWORD = "z7a2z%8G";

  public boolean isUsernameUnique(String username) {
    try (Connection connection = DriverManager.getConnection(JDBC_URL, USERNAME, PASSWORD)) {
      String sql = "SELECT COUNT(*) FROM users WHERE username = ?";
      try (PreparedStatement statement = connection.prepareStatement(sql)) {
        statement.setString(1, username);
        try (ResultSet resultSet = statement.executeQuery()) {
          if (resultSet.next()) {
            int count = resultSet.getInt(1);
            return count == 0; // If count is 0, username is unique
          }
        }
      }
    } catch (SQLException e) {
      e.printStackTrace(); // Handle the exception according to your application's needs
    }
    return false; // Return false in case of an exception or database error
  }

//  public static void main(String[] args) {
//    UsernameChecker usernameChecker = new UsernameChecker();
//    String usernameToCheck = "Test";
//    boolean isUnique = usernameChecker.isUsernameUnique(usernameToCheck);
//    if (isUnique) {
//      System.out.println("Username is unique!");
//    } else {
//      System.out.println("Username already exists!");
//    }
//  }
}
