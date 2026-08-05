package com.educonnect.dto;

import com.educonnect.model.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TagDTO {
    private Long id;
    private String name;
    private String category;

    public static TagDTO fromEntity(Tag tag) {
        return TagDTO.builder()
            .id(tag.getId())
            .name(tag.getName())
            .category(tag.getCategory())
            .build();
    }
}
