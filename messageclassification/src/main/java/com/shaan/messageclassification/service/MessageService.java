package com.shaan.messageclassification.service;

import com.shaan.messageclassification.models.Department;
import com.shaan.messageclassification.models.Message;
import com.shaan.messageclassification.repository.DepartmentRepository;
import com.shaan.messageclassification.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Optional<Message> getMessageById(String id) {
        return messageRepository.findById(id);
    }

    public Message createMessage(Message message) {
        String messageId = UUID.randomUUID().toString();
        message.setId(messageId);
        List<Department> departments = departmentRepository.findAll();
        List<String> matchingDepartmentIds = new ArrayList<>();
        for (Department department : departments) {
            List<String> stopWords = department.getStopWords();
            int matchingWords = 0;
            String[] messageWords = message.getContent().replaceAll("[^a-zA-Z ]", "").toLowerCase().split("\\s+");
            if (stopWords != null) {
                for (String word : messageWords) {
                    if (stopWords.contains(word)) {
                        matchingWords++;
                    }
                }
                double matchingPercentage = (double) matchingWords / messageWords.length * 100;
                System.out.println("Matching percentage for department " + department.getDepartmentName() + ": " + matchingPercentage + "%");
                if (matchingPercentage > 50) {
                    matchingDepartmentIds.add(department.getDepartmentId());
                }
            } else {
                System.out.println("Matching percentage for department " + department.getDepartmentName() + ": 0%");
            }
        }
        if (!matchingDepartmentIds.isEmpty()) {
            String[] matchingDepartmentIdsArray = matchingDepartmentIds.toArray(new String[0]);
            messageRepository.save(message);
            return assignDepartments(messageId, Arrays.asList(matchingDepartmentIdsArray));
        } else {
            return messageRepository.save(message);
        }
    }

    public void deleteMessage(String id) {
        messageRepository.deleteById(id);
    }

    public Message assignDepartments(String messageId, List<String> departmentIds) {
        Optional<Message> optionalMessage = messageRepository.findById(messageId);
        if (optionalMessage.isPresent()) {
            Message message = optionalMessage.get();
            String content = message.getContent();
            Set<String> stopWordsSet = new HashSet<>();
            String[] words = content.replaceAll("[^a-zA-Z ]", "").toLowerCase().split("\\s+");
            for (String word : words) {
                stopWordsSet.add(word);
            }
            List<String> stopWords = new ArrayList<>(stopWordsSet);
            for (String departmentId : departmentIds) {
                Optional<Department> optionalDepartment = departmentRepository.findById(departmentId);
                if (optionalDepartment.isPresent()) {
                    Department department = optionalDepartment.get();
                    List<String> existingStopWords = department.getStopWords();
                    if (existingStopWords == null) {
                        existingStopWords = new ArrayList<>();
                    }
                    existingStopWords.addAll(stopWords);
                    List<String> uniqueStopWords = new ArrayList<>(new HashSet<>(existingStopWords));
                    department.setStopWords(uniqueStopWords);
                    departmentRepository.save(department);
                }
            }
            message.setDepartmentIds(departmentIds);
            message.setAssigned(true);
            return messageRepository.save(message);
        } else {
            return null;
        }
    }

    public List<Message> getUnassignedMessages() {
        return messageRepository.findByAssignedFalse();
    }

    public List<Message> getAssignedMessages() {
        return messageRepository.findByAssignedTrue();
    }
}
