package com.shaan.messageclassification.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "department")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Department {

    @Id
    private String departmentId;

    @Indexed(unique = true)
    private String departmentName;

    private List<String> stopWords;
}
