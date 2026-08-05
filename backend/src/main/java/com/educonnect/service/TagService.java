package com.educonnect.service;

import com.educonnect.model.Tag;
import com.educonnect.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    public List<String> searchTags(String search) {
        if (search == null || search.isEmpty()) {
            return tagRepository.findAll().stream()
                    .map(Tag::getName)
                    .collect(Collectors.toList());
        }
        return tagRepository.findByNameContainingIgnoreCase(search).stream()
                .map(Tag::getName)
                .collect(Collectors.toList());
    }

    public Map<String, List<String>> getCategorizedTags() {
        List<Tag> allTags = tagRepository.findAll();
        return allTags.stream()
                .filter(tag -> tag.getCategory() != null)
                .collect(Collectors.groupingBy(
                        Tag::getCategory,
                        Collectors.mapping(Tag::getName, Collectors.toList())
                ));
    }
}
