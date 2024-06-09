import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  List,
  ListItem,
  Spinner,
  Icon,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FaBuilding, FaEdit, FaTrash } from 'react-icons/fa';
import { backendURL } from '../../backendURL';

const ViewAllDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${backendURL}/department/`);
        setDepartments(response.data);
        setFilteredDepartments(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const filtered = departments.filter(department =>
      department.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [searchTerm, departments]);

  const handleUpdateClick = (department) => {
    setSelectedDepartment(department);
    setUpdatedName(department.departmentName);
    onOpen();
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(`${backendURL}/department/`, {
        departmentId: selectedDepartment.departmentId,
        departmentName: updatedName,
      });
      setDepartments((prevDepartments) =>
        prevDepartments.map((dept) =>
          dept.departmentId === response.data.departmentId ? response.data : dept
        )
      );
      toast({
        title: 'Department updated.',
        description: "The department's name has been updated successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error updating department.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = async (departmentId) => {
    try {
      await axios.delete(`${backendURL}/department/${departmentId}`);
      setDepartments((prevDepartments) =>
        prevDepartments.filter(dept => dept.departmentId !== departmentId)
      );
      toast({
        title: 'Department deleted.',
        description: "The department has been deleted successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting department.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return <Box color="red.500">Error fetching departments: {error.message}</Box>;
  }

  return (
    <Box p={4} maxW="600px" mx="auto">
      <Text fontSize="2xl" mb={4} textAlign="center">Departments</Text>
      <FormControl mb={4}>
        <FormLabel>Search Departments</FormLabel>
        <Input
          type="text"
          placeholder="Enter department name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FormControl>
      <List spacing={3}>
        {filteredDepartments.map((department) => (
          <ListItem 
            key={department.departmentId} 
            display="flex" 
            alignItems="center" 
            justifyContent="space-between"
            p={3} 
            borderWidth="1px" 
            borderRadius="md" 
            boxShadow="sm"
            _hover={{ boxShadow: 'md', bg: 'gray.50' }}
          >
            <Box display="flex" alignItems="center">
              <Icon as={FaBuilding} boxSize={6} mr={3} color="blue.500" />
              <Text>{department.departmentName}</Text>
            </Box>
            <Box display="flex" alignItems="center">
              <Icon as={FaEdit} boxSize={5} color="gray.500" cursor="pointer" onClick={() => handleUpdateClick(department)} mr={3} />
              <Icon as={FaTrash} boxSize={5} color="red.500" cursor="pointer" onClick={() => handleDeleteClick(department.departmentId)} />
            </Box>
          </ListItem>
        ))}
      </List>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Department</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="department-name">
              <FormLabel>Department Name</FormLabel>
              <Input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateSubmit}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ViewAllDepartments;
