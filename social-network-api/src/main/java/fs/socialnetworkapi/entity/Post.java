package fs.socialnetworkapi.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "posts")
@Data
public class Post extends AbstractEntity {

    private String description;

    private String photo;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
