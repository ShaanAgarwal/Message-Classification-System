import React, { useState, useEffect } from "react";
import { Box, Text, VStack, IconButton, useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { backendURL } from "../../backendURL";

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${backendURL}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`${backendURL}/messages/${id}`);
      // Update messages state after deleting the message
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
      toast({
        title: "Success",
        description: "Message deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the message.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack align="start" spacing={4}>
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        All Messages:
      </Text>
      {messages.map((message) => (
        <Box
          key={message.id}
          borderWidth="1px"
          borderRadius="md"
          p={4}
          w="100%"
          bg={message.assigned ? "green.100" : "red.100"} // Set background color based on assignment
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text>{message.content}</Text>
          <IconButton
            aria-label="Delete message"
            icon={<DeleteIcon />}
            onClick={() => handleDeleteMessage(message.id)}
            colorScheme="red"
          />
        </Box>
      ))}
    </VStack>
  );
};

export default ViewMessages;
