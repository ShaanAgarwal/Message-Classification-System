import React, { useState, useEffect } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { backendURL } from "../../backendURL";

const AllMessages = () => {
  const [assignedMessages, setAssignedMessages] = useState([]);
  const departmentId = localStorage.getItem("selectedDepartmentId");

  useEffect(() => {
    const fetchAssignedMessages = async () => {
      try {
        const response = await axios.get(`${backendURL}/messages/assigned`);
        const filteredMessages = response.data.filter((message) =>
          message.departmentIds.includes(departmentId)
        );
        setAssignedMessages(filteredMessages);
      } catch (error) {
        console.error("Error fetching assigned messages:", error);
      }
    };

    fetchAssignedMessages();
  }, [departmentId]);

  return (
    <VStack align="start" spacing={4}>
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        Assigned Messages:
      </Text>
      {assignedMessages.map((message) => (
        <Box
          key={message.id}
          borderWidth="1px"
          borderRadius="md"
          p={4}
          w="100%"
        >
          <Text>{message.content}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default AllMessages;
