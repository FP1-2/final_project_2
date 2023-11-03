package fs.socialnetworkapi.dto.user;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UsernameChecker {

  private static final String JDBC_URL = "jdbc:"
    + "postgresql://db-final-project-2.cx0wpt1wnne4.us-east-1.rds.amazonaws.com:5432/twitter";
  private static final String USERNAME = "postgres";
  private static final String PAS = "z7a2z%8G";

  public boolean isUsernameUnique(String username) {

    try (Connection connection = DriverManager.getConnection(JDBC_URL, USERNAME, PAS)) {
      String sql = "SELECT COUNT(*) FROM users WHERE username = ?";
      try (PreparedStatement statement = connection.prepareStatement(sql)) {
        statement.setString(1, username);
        try (ResultSet resultSet = statement.executeQuery()) {
          if (resultSet.next()) {
            int count = resultSet.getInt(1);
            return count == 0;
          }
        }
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return false;
  }

}
