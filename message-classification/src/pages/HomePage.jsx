import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../backendURL";

const HomePage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messageContent, setMessageContent] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const toast = useToast();

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

  const navigateAdminDashboard = () => {
    navigate("/admin");
  };

  const navigateMessageRouting = () => {
    navigate("/message-routing");
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleDepartmentDashboard = () => {
    localStorage.setItem("selectedDepartmentId", selectedDepartment);
    navigate(`/department/${selectedDepartment}`);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${backendURL}/messages/`, {
        content: messageContent,
      });
      toast({
        title: "Message created.",
        description: "The message has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      setMessageContent("");
    } catch (error) {
      toast({
        title: "Error creating message.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8}>
      <Center>
        <Heading as="h1" size="xl" mb={8}>
          Message Classification System
        </Heading>
      </Center>
      <HStack spacing={4} mb={8} align="center">
        <Button onClick={navigateAdminDashboard} colorScheme="blue">
          Admin
        </Button>
        <Button onClick={onOpen} colorScheme="green">
          Create Message
        </Button>
        <Button onClick={navigateMessageRouting} colorScheme="purple">
          Message Routing
        </Button>
        <Select
          placeholder="Select Department"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          width="200px"
        >
          {departments.map((department) => (
            <option
              key={department.departmentId}
              value={department.departmentId}
            >
              {department.departmentName}
            </option>
          ))}
        </Select>
        <Button
          onClick={handleDepartmentDashboard}
          colorScheme="orange"
          isDisabled={!selectedDepartment}
        >
          Go to Department Dashboard
        </Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="message-content">
              <FormLabel>Message Content</FormLabel>
              <Input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HomePage;
