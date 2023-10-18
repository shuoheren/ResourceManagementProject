package com.example.UPR_Management;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.UPR_Management.Entity.Project;
import com.example.UPR_Management.Repo.ProjectRepository;

@SpringBootTest
class UprManagementApplicationTests {

	@Autowired
	ProjectRepository projectRepository;


	@Test
	void contextLoads() {
	}
	@Test
	void test1() {
		System.out.println("Test 1");
	}
	@Test
	void test2() {
		Project project=new Project();
		project.setProjectName("demo");
		project.setResources(null);
		projectRepository.save(project);


	}

}
