package fs.socialnetworkapi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Set;

@Entity
@Table(name = "roles")
@Data
public class RoleEntity extends AbstractEntity implements GrantedAuthority {

    private String name;

    @Transient
    @ManyToMany(mappedBy = "roles")
    private Set<User> users;

    public RoleEntity(Long id, String name) {
        setId(id);
        this.name = name;
    }
    public RoleEntity(){

    }

    public static RoleEntity getUserRole(){
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setName("ROLE_USER");
        return roleEntity;
    }

    @Override
    public String getAuthority() {
        return null;
    }
}
