import React, { useState } from 'react';
import { Box, Button, VStack, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ViewUnassignedMessages from '../components/MessageRouting/ViewUnassignedMessages';
import ViewAssignedMessages from '../components/MessageRouting/ViewAssignedMessages';

const MessageRouting = () => {
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState('viewUnassignedMessages');

  const renderContent = () => {
    switch (selectedContent) {
      case 'viewUnassignedMessages':
        return <ViewUnassignedMessages />;
      case 'viewAssignedMessages':
        return <ViewAssignedMessages />;
      default:
        return <Box>Select an option</Box>;
    }
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
        <Button width="100%" onClick={() => setSelectedContent('viewUnassignedMessages')}>
          View Unassigned Messages
        </Button>
        <Button width="100%" onClick={() => setSelectedContent('viewAssignedMessages')}>
          View Assigned Messages
        </Button>
      </VStack>
      <Box width="80%" padding={4}>
        <Button
          position="absolute"
          top="1rem"
          right="1rem"
          onClick={() => navigate('/')}
        >
          Go to Homepage
        </Button>
        {renderContent()}
      </Box>
    </HStack>
  );
};

export default MessageRouting;
