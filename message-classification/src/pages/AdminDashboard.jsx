import { Box, Button, VStack, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewAllDepartments from "../components/Admin/ViewAllDepartments";
import CreateDepartment from "../components/Admin/CreateDepartment";
import ViewMessages from "../components/Admin/ViewMessages";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState("viewDepartments");

  const renderContent = () => {
    switch (selectedContent) {
      case "viewDepartments":
        return <ViewAllDepartments />;
      case "createDepartment":
        return <CreateDepartment />;
      case "viewMessages":
        return <ViewMessages />
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
        <Button width="100%" onClick={() => setSelectedContent("viewDepartments")}>View Departments</Button>
        <Button width="100%" onClick={() => setSelectedContent("createDepartment")}>Create Department</Button>
        <Button width="100%" onClick={() => setSelectedContent("viewMessages")}>View All Messages</Button>
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

export default AdminDashboard;
