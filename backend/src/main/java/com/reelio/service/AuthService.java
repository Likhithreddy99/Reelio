package com.reelio.service;
import com.reelio.dto.AuthRequest;
import com.reelio.dto.AuthResponse;
import com.reelio.dto.RegisterRequest;
import com.reelio.entity.User;
import com.reelio.repository.UserRepository;
import com.reelio.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;
  @Autowired
   private UserRepository userRepository;
      @Autowired
    private PasswordEncoder passwordEncoder;
  @Autowired
      private JwtUtil jwtUtil;
  public AuthResponse login(AuthRequest authRequest) {
         Authentication authentication = authenticationManager.authenticate(
             new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );
       UserDetails userDetails = (UserDetails) authentication.getPrincipal();
          User user = userRepository.findByEmail(authRequest.getEmail()).orElse(null);
         String token = jwtUtil.generateToken(userDetails.getUsername(), user.getRole().name());
        return new AuthResponse(token, user.getRole().name(), user.getName(), user.getId());
   }
      public AuthResponse register(RegisterRequest registerRequest) {
      if (userRepository.existsByEmail(registerRequest.getEmail())) {
           throw new RuntimeException("Email already exists");
          }
         User user = new User();
       user.setEmail(registerRequest.getEmail());
         user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
         user.setName(registerRequest.getName());
         user.setRole(registerRequest.getRole());
       user.setPhone(registerRequest.getPhone());
      user.setBio(registerRequest.getBio());
      user = userRepository.save(user);
         String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
          return new AuthResponse(token, user.getRole().name(), user.getName(), user.getId());
     }
}