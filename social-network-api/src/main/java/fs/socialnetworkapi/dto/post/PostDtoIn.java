package fs.socialnetworkapi.dto.post;

import lombok.Builder;
import lombok.Data;
import jakarta.validation.constraints.*;

@Data
@Builder(toBuilder = true)
public class PostDtoIn {

    private Long id;
    private Long userId;
    private String photo;
    @Size(min = 1, max = 280, message = "Description should be between 1 and 280 characters")
    private String description;

}
