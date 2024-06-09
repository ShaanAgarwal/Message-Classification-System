package com.shaan.messageclassification.controller;

import com.shaan.messageclassification.models.Message;
import com.shaan.messageclassification.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @GetMapping("/{id}")
    public Optional<Message> getMessageById(@PathVariable String id) {
        return messageService.getMessageById(id);
    }

    @PostMapping("/")
    public Message createMessage(@RequestBody Message message) {
        return messageService.createMessage(message);
    }

    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable String id) {
        messageService.deleteMessage(id);
    }

    @PutMapping("/{id}/assign")
    public Message assignDepartments(@PathVariable("id") String id, @RequestBody List<String> departmentIds) {
        return messageService.assignDepartments(id, departmentIds);
    }

    @GetMapping("/unassigned")
    public ResponseEntity<List<Message>> getUnassignedMessages() {
        List<Message> unassignedMessages = messageService.getUnassignedMessages();
        return new ResponseEntity<>(unassignedMessages, HttpStatus.OK);
    }

    @GetMapping("/assigned")
    public ResponseEntity<List<Message>> getAssignedMessages() {
        List<Message> assignedMessages = messageService.getAssignedMessages();
        return new ResponseEntity<>(assignedMessages, HttpStatus.OK);
    }
}
