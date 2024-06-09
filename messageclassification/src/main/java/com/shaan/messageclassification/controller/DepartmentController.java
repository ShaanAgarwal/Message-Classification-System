package com.shaan.messageclassification.controller;

import com.shaan.messageclassification.models.Department;
import com.shaan.messageclassification.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/department")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @PostMapping("/")
    public ResponseEntity<?> createDepartment(@RequestBody Department department) {
        Department departmentExists = departmentService.findDepartmentByName(department.getDepartmentName());
        if(departmentExists != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Department already exists");
        }
        Department createdDepartment = departmentService.addDepartment(department);
        if (createdDepartment != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDepartment);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create department");
        }
    }

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public List<Department> getAllDepartments() {
        return departmentService.findAllDepartments();
    }

    @GetMapping("/{departmentId}")
    public Department getDepartmentById(@PathVariable("departmentId") String departmentId) {
        return departmentService.findDepartmentById(departmentId);
    }

    @PutMapping("/")
    public Department updateDepartment(@RequestBody Department department) {
        return departmentService.updateDepartment(department.getDepartmentId(), department);
    }

    @DeleteMapping("/{departmentId}")
    public Department deleteDepartment(@PathVariable("departmentId") String departmentId) {
        return departmentService.deleteDepartment(departmentId);
    }

}
