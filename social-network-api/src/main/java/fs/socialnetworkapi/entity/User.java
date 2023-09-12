package fs.socialnetworkapi.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "users")
@Setter
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String birthday;
    private String avatar;
    private String mainFoto;
    private String password;
    private boolean active;
    private String activationCode;


}


