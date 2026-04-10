package com.reelio.controller;
import com.reelio.dto.AuthRequest;
import com.reelio.dto.AuthResponse;
import com.reelio.dto.RegisterRequest;
import com.reelio.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
   @Autowired
    private AuthService authService;
      @PostMapping("/login")
     public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        try {
              AuthResponse response = authService.login(authRequest);
            return ResponseEntity.ok(response);
          } catch (Exception e) {
          return ResponseEntity.badRequest().build();
         }
      }
  @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
      try {
           AuthResponse response = authService.register(registerRequest);
            return ResponseEntity.ok(response);
         } catch (Exception e) {
            return ResponseEntity.badRequest().build();
         }
  }
}