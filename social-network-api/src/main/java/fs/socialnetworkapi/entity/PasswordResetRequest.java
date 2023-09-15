package fs.socialnetworkapi.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordResetRequest {
    private String activationCode;
    private String newPassword;

}
