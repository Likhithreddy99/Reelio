package com.reelio.controller;

import com.reelio.dto.CinematographerDTO;
import com.reelio.service.AiSearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final AiSearchService aiSearchService;

    @GetMapping
    public ResponseEntity<List<CinematographerDTO>> search(@RequestParam String q) {
        return ResponseEntity.ok(aiSearchService.search(q));
    }

    public SearchController(AiSearchService aiSearchService) {
        this.aiSearchService = aiSearchService;
    }
}
