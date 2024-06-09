import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Checkbox, Button, useToast } from '@chakra-ui/react';
import { backendURL } from '../../backendURL';

const ViewAssignedMessages = () => {
  const [assignedMessages, setAssignedMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchAssignedMessages = async () => {
      try {
        const response = await axios.get(`${backendURL}/messages/assigned`);
        setAssignedMessages(response.data);
      } catch (error) {
        console.error('Error fetching assigned messages:', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${backendURL}/department/`);
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchAssignedMessages();
    fetchDepartments();
  }, []);

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setSelectedDepartments(message.departmentIds);
    setIsModalOpen(true);
  };

  const handleUpdateDepartments = async () => {
    try {
      await axios.put(`${backendURL}/messages/${selectedMessage.id}/assign`, selectedDepartments);
      // Refresh assigned messages after updating departments
      const response = await axios.get(`${backendURL}/messages/assigned`);
      setAssignedMessages(response.data);
      setIsModalOpen(false);
      toast({
        title: "Success",
        description: "Departments updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating departments:', error);
      toast({
        title: "Error",
        description: "An error occurred while updating departments.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCheckboxChange = (departmentId) => {
    setSelectedDepartments((prevSelected) => {
      if (prevSelected.includes(departmentId)) {
        return prevSelected.filter((id) => id !== departmentId);
      } else {
        return [...prevSelected, departmentId];
      }
    });
  };  

  return (
    <Box>
      {assignedMessages.map((message) => (
        <Box
          key={message.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          cursor="pointer"
          _hover={{ bg: 'gray.100' }}
          onClick={() => handleViewMessage(message)}
          mb={4}
        >
          <Text fontSize="lg" fontWeight="bold">{message.content}</Text>
        </Box>
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Message Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg" fontWeight="bold">Message Content:</Text>
            <Text>{selectedMessage?.content}</Text>
            <Text fontSize="lg" fontWeight="bold" mt={4}>Assigned Departments:</Text>
            <VStack align="start" spacing={2}>
              {departments.map((department) => (
                <Checkbox
                  key={department.departmentId}
                  value={department.departmentId}
                  isChecked={selectedDepartments.includes(department.departmentId)}
                  onChange={() => handleCheckboxChange(department.departmentId)}
                >
                  {department.departmentName}
                </Checkbox>
              ))}
            </VStack>
          </ModalBody>
          <ModalBody>
            <Button colorScheme="blue" onClick={handleUpdateDepartments}>Update Departments</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ViewAssignedMessages;
