import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { backendURL } from "../../backendURL";

const CreateDepartment = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${backendURL}/department/`, {
        departmentName,
      });

      if (response.status === 201) {
        toast({
          title: "Department created.",
          description: "The department has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setDepartmentName("");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast({
          title: "Error creating department.",
          description: "Department already exists.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error creating department.",
          description: "Failed to create department.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={8}
      p={4}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="sm"
    >
      <Text fontSize="2xl" mb={4} textAlign="center">
        Create Department
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl id="department-name" mb={4} isRequired>
          <FormLabel>Department Name</FormLabel>
          <Input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="Enter department name"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" isLoading={loading}>
          Create Department
        </Button>
      </form>
    </Box>
  );
};

export default CreateDepartment;
