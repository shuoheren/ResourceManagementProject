package com.example.UPR_Management.Controller;
import com.example.UPR_Management.DTO.User.ResetPasswordRequestDTO;
import com.example.UPR_Management.DTO.UserDTO;
import com.example.UPR_Management.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserDTO> createOrUpdateUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.saveOrUpdateUser(userDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {
        UserDTO userDTO = userService.getUserByUsername(username);
        if (userDTO != null) {
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/{username}/addProject/{projectId}")
    public ResponseEntity<String> addProjectToUser(@PathVariable String username, @PathVariable Long projectId) {
        try {
            userService.addProjectToUser(username, projectId);
            return ResponseEntity.ok("Project added to user successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding project to user.");
        }
    }


    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequestDTO request) {
        boolean success = userService.resetPassword(request);

        if (success) {
            return ResponseEntity.ok().body(Map.of("success", true));
        } else {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "User not found or other error."));
        }
    }

}
