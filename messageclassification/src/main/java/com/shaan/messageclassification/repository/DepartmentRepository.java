package com.shaan.messageclassification.repository;

import com.shaan.messageclassification.models.Department;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DepartmentRepository extends MongoRepository<Department, String> {
    Department findByDepartmentName(String departmentName);
}
