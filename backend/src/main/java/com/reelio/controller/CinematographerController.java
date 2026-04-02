package com.reelio.controller;

import com.reelio.dto.CinematographerDTO;
import com.reelio.model.User;
import com.reelio.service.CinematographerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cinematographers")
public class CinematographerController {

    private final CinematographerService cinematographerService;

    @GetMapping
    public ResponseEntity<List<CinematographerDTO>> getAll() {
        return ResponseEntity.ok(cinematographerService.getAllCinematographers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CinematographerDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(cinematographerService.getCinematographerById(id));
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<CinematographerDTO>> getByCity(@PathVariable String city) {
        return ResponseEntity.ok(cinematographerService.getCinematographersByCity(city));
    }

    @PutMapping("/profile")
    public ResponseEntity<CinematographerDTO> updateProfile(
            @AuthenticationPrincipal User user,
            @RequestBody CinematographerDTO updateRequest) {
        if (!user.getRole().name().equals("CINEMATOGRAPHER")) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(cinematographerService.updateProfile(user.getId(), updateRequest));
    }

    public CinematographerController(CinematographerService cinematographerService) {
        this.cinematographerService = cinematographerService;
    }
}
