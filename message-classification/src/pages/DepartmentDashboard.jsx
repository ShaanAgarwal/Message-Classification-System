import React, { useState } from "react";
import { Box, Button, VStack, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AllMessages from "../components/Department/AllMessages";

const DepartmentDashboard = () => {
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState("viewDepartments");

  const renderContent = () => {
    switch (selectedContent) {
        case "viewAllMessages":
            return <AllMessages />
      default:
        return <Box>Select an option</Box>;
    }
  };

  const handleGoToHomepage = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <HStack height="100vh" alignItems="start">
      <VStack
        width="20%"
        padding={4}
        borderRight="1px solid gray"
        spacing={4}
        bg="gray.100"
        height="100vh"
      >
        <Button
          width="100%"
          onClick={() => setSelectedContent("viewAllMessages")}
        >
          View All Messages
        </Button>
      </VStack>
      <Box width="80%" padding={4}>
        <Button
          position="absolute"
          top="1rem"
          right="1rem"
          onClick={handleGoToHomepage}
        >
          Go to Homepage
        </Button>
        {renderContent()}
      </Box>
    </HStack>
  );
};

export default DepartmentDashboard;
