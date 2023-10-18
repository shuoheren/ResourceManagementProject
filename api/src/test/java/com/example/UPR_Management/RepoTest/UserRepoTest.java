package com.example.UPR_Management.RepoTest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.UPR_Management.Entity.User;
import com.example.UPR_Management.Repo.UserRepository;

@SpringBootTest
public class UserRepoTest {
  
@Autowired
UserRepository userRepository;
  
  @Test
  void addUser() {
    User user = new User();
    user.setEmail("HelloWorld.comn");
    user.setUserName("hello");
    user.setPassword("world");
    userRepository.save(user);
  } 
}
