package com.example.UPR_Management.Service;

import com.example.UPR_Management.Entity.User;
import com.example.UPR_Management.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.UPR_Management.DTO.UserDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired 
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Optional<UserDTO> getUserById(String id) {
        return userRepository.findById(id).map(this::convertToDTO);
    }

    public UserDTO saveOrUpdateUser(UserDTO userDTO) {
        User user = convertToEntity(userDTO);
        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    public void deleteUser(String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("User with ID " + id + " does not exist");
        }
    }

    public UserDTO getUserByUsername(String username) {
        return userRepository.findById(username).map(this::convertToDTO).orElse(null);
    }

    // Conversion methods
    public UserDTO convertToDTO(User user) {
        // Here you convert the user entity to userDTO. You can use ModelMapper or manual mapping.
        // Ensure all fields are correctly mapped.
        // Example:
        UserDTO userDTO = new UserDTO();
        userDTO.setUserName(user.getUserName());
        userDTO.setPassword(user.getPassword());
        userDTO.setRole(user.getRole());
        userDTO.setEmail(user.getEmail());
        userDTO.setCreateDate(user.getCreateDate());
        userDTO.setProjectIds(user.getProjectIds());

        return userDTO;
    }

    public User convertToEntity(UserDTO dto) {
        // Convert DTO to User entity. Ensure all fields are mapped.
        User user = new User();
        user.setUserName(dto.getUserName());
        //... Set other fields
        return user;
    }
}
