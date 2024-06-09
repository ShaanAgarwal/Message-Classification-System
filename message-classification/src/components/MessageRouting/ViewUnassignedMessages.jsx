import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useToast,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { backendURL } from "../../backendURL";

const ViewUnassignedMessages = () => {
  const [unassignedMessages, setUnassignedMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchUnassignedMessages = async () => {
      try {
        const response = await axios.get(`${backendURL}/messages/unassigned`);
        setUnassignedMessages(response.data);
      } catch (error) {
        console.error("Error fetching unassigned messages:", error);
      }
    };

    fetchUnassignedMessages();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${backendURL}/department/`);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setSelectedDepartments([]);
    setIsModalOpen(true);
  };

  const handleAssignMessage = async () => {
    if (!selectedMessage || selectedDepartments.length === 0) {
      toast({
        title: "Error",
        description: "Please select a message and at least one department.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const id = selectedMessage.id;
      const res = await axios.put(
        `${backendURL}/messages/${id}/assign`,
        selectedDepartments
      );
      const response = await axios.get(`${backendURL}/messages/unassigned`);
      setUnassignedMessages(response.data);
      toast({
        title: "Success",
        description: "Message assigned to departments successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error assigning message:", error);
      toast({
        title: "Error",
        description: "An error occurred while assigning departments.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (checkedValues) => {
    setSelectedDepartments(checkedValues);
  };

  return (
    <Box marginTop="10">
      <VStack spacing={4} align="stretch">
        {Array.isArray(unassignedMessages) &&
          unassignedMessages.map((message) => (
            <Box
              key={message.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              onClick={() => handleViewMessage(message)}
              cursor="pointer"
            >
              <Text fontSize="lg" fontWeight="bold">
                {message.content.slice(0, 50)}
                {message.content.length > 50 ? "..." : ""}
              </Text>
            </Box>
          ))}
      </VStack>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg" fontWeight="bold">
              {selectedMessage?.content}
            </Text>
            <CheckboxGroup
              value={selectedDepartments}
              onChange={handleCheckboxChange}
            >
              <VStack align="stretch">
                {departments.map((department) => (
                  <Checkbox
                    key={department.departmentId}
                    value={department.departmentId}
                  >
                    {department.departmentName}
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
            <Button
              mt={4}
              colorScheme="blue"
              onClick={handleAssignMessage}
              isLoading={isLoading}
            >
              Assign Departments
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ViewUnassignedMessages;
