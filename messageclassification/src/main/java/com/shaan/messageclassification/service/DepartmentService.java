package com.shaan.messageclassification.service;

import com.shaan.messageclassification.models.Department;
import com.shaan.messageclassification.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public Department addDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public List<Department> findAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department findDepartmentById(String departmentId) {
        return departmentRepository.findById(departmentId).get();
    }

    public Department findDepartmentByName(String departmentName) {
        return departmentRepository.findByDepartmentName(departmentName);
    }

    public Department updateDepartment(String departmentId, Department department) {
        Department departmentExists = departmentRepository.findById(departmentId).get();
        if(departmentExists == null) {
            return null;
        } else {
            departmentExists.setDepartmentName(department.getDepartmentName());
            departmentRepository.save(departmentExists);
        }
        return departmentExists;
    }

    public Department deleteDepartment(String departmentId) {
        Department department = departmentRepository.findById(departmentId).get();
        if(department == null) {
            return null;
        } else {
            departmentRepository.deleteById(departmentId);
        }
        return department;
    }

}