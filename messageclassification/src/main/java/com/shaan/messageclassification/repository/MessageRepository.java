package com.shaan.messageclassification.repository;

import com.shaan.messageclassification.models.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByAssignedFalse();
    List<Message> findByAssignedTrue();
}